# Step 2: Chat + Code Agent — Execution Guide

## Overview
This step makes the chat actually work. When you type "Create a character that moves with arrow keys", the Code Agent will generate GDScript, explain its approach, and show you the generated files.

**Time estimate**: 60-90 minutes  
**Prerequisites**: Step 1 complete, API keys in `.env.local`, `pnpm dev` runs without errors  

**What we're building:**
1. ✅ Fixed API route using AI SDK 6's `toUIMessageStreamResponse()`
2. ✅ Code Agent with working tool `execute` functions
3. ✅ Chat panel that renders tool results (code blocks, file cards)
4. ✅ Generated files panel (see all code the agent writes)
5. ✅ Multi-step agent loop (agent can call multiple tools per request)

---

## Architecture: How Chat → Code Agent → UI Works

```
User types prompt
    ↓
ChatPanel (useChat hook) → sendMessage({ text: "..." })
    ↓  POST /api/chat
API Route → streamText() with Code Agent config
    ↓  Claude Sonnet 4 processes prompt
Code Agent calls tools: explain_approach → generate_script → create_scene
    ↓  Each tool execute() returns results
streamText auto-loops (stopWhen) until agent is done
    ↓  toUIMessageStreamResponse() streams to client
ChatPanel receives message.parts[] including:
    - type: "text" → rendered as prose
    - type: "tool-invocation" → rendered as code cards
```

---

## 2.1 — Install Missing Dependency

The chat panel needs a code syntax highlighter for displaying generated GDScript:

```bash
pnpm add react-syntax-highlighter
pnpm add -D @types/react-syntax-highlighter
```

---

## 2.2 — Update the Code Agent

The current `code-agent.ts` has tools without `execute` functions, so the AI SDK has nothing to run when the model calls them. We also need to fix the model reference to match your actual `providers.ts` setup.

**Replace the entire file `src/agents/code-agent.ts`:**

```typescript
import { tool } from 'ai';
import { z } from 'zod';

// ============================================================
// GDScript Code Agent — The first and most critical agent
// Generates Godot 4.x GDScript code from natural language
// ============================================================

export const CODE_AGENT_SYSTEM_PROMPT = `You are the GameAIgents Code Agent — an expert GDScript developer for Godot 4.x.

YOUR ROLE:
Generate complete, runnable GDScript code for Godot 4.x game projects. You specialize in 2D top-down action games (similar to Brawl Stars, Enter the Gungeon, Archvale).

WORKFLOW:
1. ALWAYS start by calling explain_approach to outline your plan
2. Then call generate_script for each file needed
3. Then call create_scene to define the scene tree
4. After all files are generated, write a brief summary of what was created

CORE RULES:
1. Always output COMPLETE, RUNNABLE GDScript — never partial snippets
2. Use Godot 4.x syntax (GDScript 2.0): typed variables, @onready, @export
3. Follow Godot best practices:
   - Use signals for communication between nodes
   - Use @export for designer-tunable parameters
   - Cache node references in _ready()
   - Use _physics_process for movement, _process for non-physics logic
4. Every script must include:
   - class_name declaration
   - Clear comments explaining the purpose
   - @export variables for tunable parameters
   - Proper signal declarations
5. For top-down action games, always consider:
   - 8-directional movement with proper animation states
   - Collision layers: Player=1, Enemies=2, Projectiles=3, Environment=4
   - Health/damage systems with invincibility frames
   - Camera following with smoothing
   - Juicy feedback: screen shake, particles, hit flash

GAME CONTEXT:
The user is building a 2D top-down action game. Think Brawl Stars meets Enter the Gungeon.
Keep it fun, responsive, and juicy.`;

// ============================================================
// Tool Definitions with Execute Functions
// ============================================================

export const codeAgentTools = {
  explain_approach: tool({
    description: 'Explain the technical approach before generating code. ALWAYS call this first.',
    parameters: z.object({
      summary: z.string().describe('Brief summary of what will be built'),
      components: z.array(z.object({
        name: z.string().describe('Component/file name'),
        purpose: z.string().describe('What this component does'),
        node_type: z.string().describe('Godot node type, e.g. CharacterBody2D'),
      })).describe('List of components/files to be created'),
      architecture_notes: z.string().optional().describe('Key design decisions'),
    }),
    execute: async ({ summary, components, architecture_notes }) => {
      // This tool is informational — it returns the plan for the user to see
      return {
        status: 'plan_ready',
        summary,
        components,
        architecture_notes: architecture_notes || '',
        message: `Plan: ${summary}. Creating ${components.length} file(s).`,
      };
    },
  }),

  generate_script: tool({
    description: 'Generate a complete GDScript file for a Godot 4.x node',
    parameters: z.object({
      file_path: z.string().describe('Path relative to project root, e.g. "scripts/player.gd"'),
      node_type: z.string().describe('Godot node type this script extends, e.g. "CharacterBody2D"'),
      description: z.string().describe('Brief description of what this script does'),
      code: z.string().describe('The complete GDScript code'),
      dependencies: z.array(z.string()).optional().describe('Other scripts/scenes this depends on'),
    }),
    execute: async ({ file_path, node_type, description, code, dependencies }) => {
      // In MVP, we store files in-memory (sent back to client via tool result)
      // In Phase 2, these get saved to Supabase and injected into Godot WASM
      return {
        status: 'file_generated',
        file_path,
        node_type,
        description,
        code,
        dependencies: dependencies || [],
        line_count: code.split('\n').length,
        message: `Generated ${file_path} (${code.split('\n').length} lines) — ${description}`,
      };
    },
  }),

  modify_script: tool({
    description: 'Modify an existing GDScript file',
    parameters: z.object({
      file_path: z.string().describe('Path to the existing script'),
      changes: z.array(z.object({
        description: z.string().describe('What this change does'),
        new_code: z.string().describe('The new/replacement code'),
        location: z.enum(['replace_all', 'append']).describe('Where to apply the change'),
      })).describe('List of changes to make'),
      reason: z.string().describe('Why this modification is needed'),
    }),
    execute: async ({ file_path, changes, reason }) => {
      return {
        status: 'file_modified',
        file_path,
        changes_count: changes.length,
        reason,
        changes,
        message: `Modified ${file_path}: ${reason}`,
      };
    },
  }),

  create_scene: tool({
    description: 'Define a Godot scene structure (node tree)',
    parameters: z.object({
      scene_path: z.string().describe('Path for the scene file, e.g. "scenes/player.tscn"'),
      root_node_type: z.string().describe('Root node type, e.g. "CharacterBody2D"'),
      root_node_name: z.string().describe('Root node name, e.g. "Player"'),
      attached_script: z.string().optional().describe('Script path attached to root node'),
      children: z.array(z.object({
        type: z.string().describe('Node type'),
        name: z.string().describe('Node name'),
        properties: z.record(z.string()).optional().describe('Node property key-value pairs'),
      })).optional().describe('Child nodes'),
      description: z.string().describe('What this scene represents in the game'),
    }),
    execute: async ({ scene_path, root_node_type, root_node_name, attached_script, children, description }) => {
      return {
        status: 'scene_created',
        scene_path,
        root_node_type,
        root_node_name,
        attached_script: attached_script || null,
        children: children || [],
        description,
        message: `Created scene ${scene_path}: ${description}`,
      };
    },
  }),
};
```

---

## 2.3 — Update the Chat API Route

The current route uses the old `toDataStreamResponse()` API. We need `toUIMessageStreamResponse()` and `convertToModelMessages()` for AI SDK 6.

**Replace the entire file `src/app/api/chat/route.ts`:**

```typescript
import { streamText, convertToModelMessages, UIMessage } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { CODE_AGENT_SYSTEM_PROMPT, codeAgentTools } from '@/agents/code-agent';
import { stopWhen, stepCountIs } from 'ai';

export const maxDuration = 60; // Allow up to 60 seconds for generation

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      // Use Claude Sonnet 4 directly via the anthropic provider
      model: anthropic('claude-sonnet-4-20250514'),

      // Code Agent system prompt
      system: CODE_AGENT_SYSTEM_PROMPT,

      // Convert UI messages to model-compatible format
      messages: await convertToModelMessages(messages),

      // Attach the Code Agent's tools
      tools: codeAgentTools,

      // Enable multi-step: agent can call tools, see results, then call more tools
      // Stops after 10 steps or when the model stops calling tools
      stopWhen: stepCountIs(10),

      // Callback when generation is complete
      onFinish: async ({ text, steps }) => {
        const totalToolCalls = steps.reduce(
          (sum, step) => sum + (step.toolCalls?.length || 0), 0
        );
        console.log(
          `[Code Agent] Generation complete. Steps: ${steps.length}, Tool calls: ${totalToolCalls}`
        );
        // TODO Phase 2: Save to Supabase (project files, chat history, generation metrics)
      },
    });

    // Use the UI message stream response format (required for useChat hook)
    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('[Chat API] Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to process chat request',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
```

**Important**: If `stopWhen` and `stepCountIs` are not available in your AI SDK version, replace them like this:

```typescript
// If stopWhen/stepCountIs aren't available, use maxSteps instead:
const result = streamText({
  model: anthropic('claude-sonnet-4-20250514'),
  system: CODE_AGENT_SYSTEM_PROMPT,
  messages: await convertToModelMessages(messages),
  tools: codeAgentTools,
  maxSteps: 10,  // Fallback for older AI SDK 6 builds
  onFinish: async ({ text, steps }) => {
    const totalToolCalls = steps.reduce(
      (sum, step) => sum + (step.toolCalls?.length || 0), 0
    );
    console.log(
      `[Code Agent] Generation complete. Steps: ${steps.length}, Tool calls: ${totalToolCalls}`
    );
  },
});
```

---

## 2.4 — Rewrite the Chat Panel

The current chat panel uses the old `message.content` API. AI SDK 6 uses `message.parts[]` where each part has a `type` (text, tool-invocation, etc.).

**Replace the entire file `src/components/chat/chat-panel.tsx`:**

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ToolInvocationCard } from './tool-invocation-card';

export function ChatPanel() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'streaming' || status === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="text-4xl mb-4">🎮</div>
            <h2 className="text-lg font-semibold text-zinc-200 mb-2">
              Welcome to GameAIgents
            </h2>
            <p className="text-sm text-zinc-400 max-w-xs">
              Describe the game you want to build. Start with something like:
            </p>
            <div className="mt-4 space-y-2">
              {[
                'Create a top-down shooter where I control a knight',
                'Make a Brawl Stars-style arena with 3 characters',
                'Build a dungeon crawler with enemies and loot',
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left text-xs text-zinc-400 hover:text-zinc-200
                             bg-zinc-800/50 hover:bg-zinc-800 rounded-lg px-3 py-2
                             transition-colors border border-zinc-800 hover:border-zinc-700"
                >
                  &ldquo;{suggestion}&rdquo;
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">🤖</span>
              </div>
            )}
            <div
              className={cn(
                'max-w-[85%] rounded-xl text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-blue-600 text-white px-4 py-2.5'
                  : 'space-y-3'
              )}
            >
              {/* Render message parts — the AI SDK 6 way */}
              {message.parts?.map((part, i) => {
                const key = `${message.id}-${i}`;

                switch (part.type) {
                  case 'text':
                    if (!part.text.trim()) return null;
                    return (
                      <div
                        key={key}
                        className={cn(
                          'whitespace-pre-wrap',
                          message.role === 'assistant' &&
                            'bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5'
                        )}
                      >
                        {part.text}
                      </div>
                    );

                  case 'tool-invocation':
                    return (
                      <ToolInvocationCard
                        key={key}
                        toolInvocation={part.toolInvocation}
                      />
                    );

                  default:
                    return null;
                }
              })}

              {/* Fallback for messages without parts (shouldn't happen in SDK 6) */}
              {!message.parts && 'content' in message && (
                <div className={cn(
                  'whitespace-pre-wrap',
                  message.role === 'assistant' &&
                    'bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5'
                )}>
                  {String((message as any).content || '')}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <span className="text-xs">🤖</span>
            </div>
            <div className="bg-zinc-800 rounded-xl px-4 py-2.5 border border-zinc-700">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2.5
                       text-sm text-zinc-100 placeholder:text-zinc-500 resize-none
                       focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50"
            rows={2}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-zinc-700
                       disabled:text-zinc-500 text-white rounded-lg text-sm font-medium
                       transition-colors self-end"
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-xs text-zinc-600">
          <span>Shift+Enter for new line</span>
          <span>{status === 'streaming' ? '⚡ Generating...' : status === 'submitted' ? '📤 Sending...' : '✓ Ready'}</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 2.5 — Create Tool Invocation Card Component

This component renders the Code Agent's tool calls as beautiful cards with syntax-highlighted code.

**Create new file `src/components/chat/tool-invocation-card.tsx`:**

```tsx
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// Type for tool invocation from AI SDK 6
interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: Record<string, any>;
  state: 'call' | 'partial-call' | 'result';
  result?: any;
}

interface ToolInvocationCardProps {
  toolInvocation: ToolInvocation;
}

export function ToolInvocationCard({ toolInvocation }: ToolInvocationCardProps) {
  const { toolName, args, state, result } = toolInvocation;
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);

  // While the tool is being called (streaming)
  if (state === 'call' || state === 'partial-call') {
    return (
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          <span className="text-xs font-medium text-amber-400">
            {getToolLabel(toolName)}...
          </span>
        </div>
        {args?.file_path && (
          <span className="text-xs text-zinc-500 mt-1 block font-mono">
            {args.file_path}
          </span>
        )}
      </div>
    );
  }

  // Tool has completed — render based on tool type
  switch (toolName) {
    case 'explain_approach':
      return <ApproachCard args={args} result={result} />;
    case 'generate_script':
      return (
        <ScriptCard
          args={args}
          result={result}
          isExpanded={isCodeExpanded}
          onToggle={() => setIsCodeExpanded(!isCodeExpanded)}
        />
      );
    case 'create_scene':
      return <SceneCard args={args} result={result} />;
    case 'modify_script':
      return <ModifyCard args={args} result={result} />;
    default:
      return (
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3">
          <span className="text-xs text-zinc-400">Tool: {toolName}</span>
          <pre className="text-xs text-zinc-500 mt-1 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      );
  }
}

// ============================================================
// Approach Plan Card
// ============================================================
function ApproachCard({ args, result }: { args: any; result: any }) {
  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-blue-500/10 border-b border-zinc-700 flex items-center gap-2">
        <span className="text-sm">📋</span>
        <span className="text-xs font-semibold text-blue-400">Build Plan</span>
      </div>
      <div className="px-4 py-3 space-y-2">
        <p className="text-sm text-zinc-200">{args.summary}</p>
        {args.components?.length > 0 && (
          <div className="space-y-1">
            {args.components.map((comp: any, i: number) => (
              <div key={i} className="flex items-start gap-2 text-xs">
                <span className="text-emerald-400 font-mono mt-0.5">→</span>
                <div>
                  <span className="text-zinc-200 font-medium">{comp.name}</span>
                  <span className="text-zinc-500"> ({comp.node_type})</span>
                  <span className="text-zinc-400 block">{comp.purpose}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {args.architecture_notes && (
          <p className="text-xs text-zinc-500 italic mt-2">{args.architecture_notes}</p>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Generated Script Card
// ============================================================
function ScriptCard({
  args,
  result,
  isExpanded,
  onToggle,
}: {
  args: any;
  result: any;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const code = args.code || '';
  const lineCount = code.split('\n').length;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2.5 bg-emerald-500/10 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">📄</span>
          <span className="text-xs font-mono text-emerald-400">{args.file_path}</span>
          <span className="text-xs text-zinc-500">({lineCount} lines)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={copyToClipboard}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded
                       hover:bg-zinc-700 transition-colors"
            title="Copy code"
          >
            📋 Copy
          </button>
          <button
            onClick={onToggle}
            className="text-xs text-zinc-400 hover:text-zinc-200 px-2 py-0.5 rounded
                       hover:bg-zinc-700 transition-colors"
          >
            {isExpanded ? '▼ Collapse' : '▶ Expand'}
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2 border-b border-zinc-800">
        <p className="text-xs text-zinc-400">
          <span className="text-zinc-500">extends</span>{' '}
          <span className="text-amber-400">{args.node_type}</span>
          {' — '}
          {args.description}
        </p>
      </div>

      {/* Code Block */}
      <div className={cn(
        'overflow-hidden transition-all duration-300',
        isExpanded ? 'max-h-[600px]' : 'max-h-[200px]'
      )}>
        <pre className="px-4 py-3 overflow-auto text-xs leading-relaxed">
          <code className="text-zinc-300 font-mono">
            {code.split('\n').map((line: string, i: number) => (
              <div key={i} className="flex">
                <span className="text-zinc-600 select-none w-8 text-right mr-3 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1">
                  {highlightGDScript(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Expand hint */}
      {!isExpanded && lineCount > 12 && (
        <button
          onClick={onToggle}
          className="w-full py-1.5 text-xs text-zinc-500 hover:text-zinc-300
                     bg-gradient-to-t from-zinc-900 to-transparent
                     border-t border-zinc-800 transition-colors"
        >
          Show all {lineCount} lines ▼
        </button>
      )}
    </div>
  );
}

// ============================================================
// Scene Card
// ============================================================
function SceneCard({ args, result }: { args: any; result: any }) {
  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-purple-500/10 border-b border-zinc-700 flex items-center gap-2">
        <span className="text-sm">🎬</span>
        <span className="text-xs font-mono text-purple-400">{args.scene_path}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-zinc-400 mb-2">{args.description}</p>
        <div className="font-mono text-xs space-y-1">
          <div className="text-amber-400">
            📦 {args.root_node_name} ({args.root_node_type})
          </div>
          {args.attached_script && (
            <div className="text-zinc-500 ml-4">
              📎 {args.attached_script}
            </div>
          )}
          {args.children?.map((child: any, i: number) => (
            <div key={i} className="text-zinc-400 ml-4">
              └─ {child.name} ({child.type})
              {child.properties && (
                <span className="text-zinc-600">
                  {' '}{JSON.stringify(child.properties)}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Modify Script Card
// ============================================================
function ModifyCard({ args, result }: { args: any; result: any }) {
  return (
    <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 bg-orange-500/10 border-b border-zinc-700 flex items-center gap-2">
        <span className="text-sm">✏️</span>
        <span className="text-xs font-mono text-orange-400">{args.file_path}</span>
        <span className="text-xs text-zinc-500">(modified)</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-zinc-400 mb-2">{args.reason}</p>
        {args.changes?.map((change: any, i: number) => (
          <div key={i} className="text-xs text-zinc-500 mb-1">
            • {change.description}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Simple GDScript Syntax Highlighting
// ============================================================
function highlightGDScript(line: string): React.ReactNode {
  // Comment highlighting
  if (line.trimStart().startsWith('#')) {
    return <span className="text-zinc-500 italic">{line}</span>;
  }

  // Keyword highlighting using regex replacement
  const keywords = /\b(extends|class_name|func|var|const|signal|enum|if|elif|else|for|while|match|return|pass|break|continue|await|yield|export|onready|static|void|true|false|null|self|super|preload|load|print|push_error)\b/g;
  const types = /\b(int|float|String|bool|Vector2|Vector3|Array|Dictionary|Node|CharacterBody2D|RigidBody2D|Area2D|Sprite2D|AnimationPlayer|CollisionShape2D|Camera2D|Timer|PackedScene|Resource)\b/g;
  const decorators = /(@export|@onready|@tool)/g;
  const strings = /(["'])(.*?)\1/g;
  const numbers = /\b(\d+\.?\d*)\b/g;

  // Simple approach: wrap keywords in spans
  let result = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  result = result.replace(strings, '<span class="text-green-400">$&</span>');
  result = result.replace(decorators, '<span class="text-yellow-400">$&</span>');
  result = result.replace(keywords, '<span class="text-pink-400">$&</span>');
  result = result.replace(types, '<span class="text-cyan-400">$&</span>');

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

// ============================================================
// Helper: Tool name → Human-readable label
// ============================================================
function getToolLabel(toolName: string): string {
  const labels: Record<string, string> = {
    explain_approach: '📋 Planning approach',
    generate_script: '⚙️ Generating code',
    create_scene: '🎬 Creating scene',
    modify_script: '✏️ Modifying script',
  };
  return labels[toolName] || `Running ${toolName}`;
}
```

---

## 2.6 — Update the Studio Layout

Add a "Generated Files" tab to the right panel (alongside the Game Canvas).

**Replace the entire file `src/components/studio/studio-layout.tsx`:**

```tsx
'use client';

import { useState } from 'react';
import { ChatPanel } from '@/components/chat/chat-panel';
import { GameCanvas } from '@/components/canvas/game-canvas';
import { GeneratedFiles } from '@/components/studio/generated-files';
import { cn } from '@/lib/utils';

type RightTab = 'canvas' | 'files';

export function StudioLayout() {
  const [rightTab, setRightTab] = useState<RightTab>('canvas');

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      {/* Chat Panel — Left Side */}
      <div
        className="flex flex-col border-r border-zinc-800"
        style={{ width: 420, minWidth: 320, maxWidth: 600 }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-medium text-zinc-300">Code Agent</span>
          </div>
          <span className="text-xs text-zinc-500">GameAIgents Studio</span>
        </div>
        <ChatPanel />
      </div>

      {/* Right Side — Tabs: Canvas | Files */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setRightTab('canvas')}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                rightTab === 'canvas'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              🎮 Game Preview
            </button>
            <button
              onClick={() => setRightTab('files')}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-colors',
                rightTab === 'files'
                  ? 'bg-zinc-700 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              📄 Generated Files
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors">
              ▶ Play
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {rightTab === 'canvas' ? <GameCanvas /> : <GeneratedFiles />}
      </div>
    </div>
  );
}
```

---

## 2.7 — Create Generated Files Component

This component extracts all generated files from the chat messages and displays them in a file browser.

**Create new file `src/components/studio/generated-files.tsx`:**

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface GeneratedFile {
  path: string;
  code: string;
  nodeType: string;
  description: string;
  lineCount: number;
}

export function GeneratedFiles() {
  const { messages } = useChat(); // Shares state with ChatPanel via same chat ID
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Extract generated files from tool invocation results across all messages
  const files = useMemo(() => {
    const fileMap = new Map<string, GeneratedFile>();

    for (const message of messages) {
      if (message.role !== 'assistant' || !message.parts) continue;

      for (const part of message.parts) {
        if (part.type !== 'tool-invocation') continue;
        if (part.toolInvocation.state !== 'result') continue;
        if (part.toolInvocation.toolName !== 'generate_script') continue;

        const args = part.toolInvocation.args;
        if (args?.file_path && args?.code) {
          fileMap.set(args.file_path, {
            path: args.file_path,
            code: args.code,
            nodeType: args.node_type || 'Node',
            description: args.description || '',
            lineCount: args.code.split('\n').length,
          });
        }
      }
    }

    return Array.from(fileMap.values());
  }, [messages]);

  const activeFile = files.find((f) => f.path === selectedFile) || files[0] || null;

  if (files.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-900">
        <div className="text-center px-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-zinc-800 border border-zinc-700
                          flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <h3 className="text-sm font-semibold text-zinc-400 mb-1">No files yet</h3>
          <p className="text-xs text-zinc-600 max-w-xs">
            Start a conversation with the Code Agent to generate GDScript files.
            They&apos;ll appear here as the agent creates them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex bg-zinc-900">
      {/* File Tree — Left */}
      <div className="w-56 border-r border-zinc-800 overflow-y-auto">
        <div className="px-3 py-2 border-b border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
            Project Files ({files.length})
          </span>
        </div>
        {files.map((file) => (
          <button
            key={file.path}
            onClick={() => setSelectedFile(file.path)}
            className={cn(
              'w-full text-left px-3 py-2 text-xs border-b border-zinc-800/50 transition-colors',
              activeFile?.path === file.path
                ? 'bg-zinc-800 text-zinc-100'
                : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
            )}
          >
            <div className="flex items-center gap-2">
              <span>{file.path.endsWith('.gd') ? '📜' : '🎬'}</span>
              <div className="overflow-hidden">
                <div className="font-mono truncate">{file.path.split('/').pop()}</div>
                <div className="text-zinc-600 text-[10px]">{file.lineCount} lines</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Code Viewer — Right */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeFile && (
          <>
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900">
              <div>
                <span className="text-xs font-mono text-emerald-400">{activeFile.path}</span>
                <span className="text-xs text-zinc-600 ml-2">
                  extends {activeFile.nodeType}
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(activeFile.code)}
                className="text-xs text-zinc-500 hover:text-zinc-200 px-2 py-1 rounded
                           hover:bg-zinc-800 transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <pre className="flex-1 overflow-auto px-4 py-3 text-xs leading-relaxed font-mono">
              {activeFile.code.split('\n').map((line, i) => (
                <div key={i} className="flex hover:bg-zinc-800/30">
                  <span className="text-zinc-600 select-none w-8 text-right mr-4 flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-zinc-300">{line}</span>
                </div>
              ))}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
```

---

## 2.8 — Verify & Test

### Quick verification checklist:

```bash
# Check for TypeScript errors
pnpm build

# If build fails, look at the error messages and fix
# Common issues:
# - Import path mismatches (e.g., '@/lib/utils' vs '@/lib/utils/cn')
# - Missing exports from 'ai' package (stopWhen, stepCountIs)
# - Type mismatches in tool invocation parts

# Start dev server
pnpm dev
```

### Test in browser:

1. **Navigate to** http://localhost:3000/studio
2. **Click a suggestion** like "Create a top-down shooter where I control a knight"
3. **Watch the chat** — you should see:
   - 📋 **Build Plan** card (from `explain_approach` tool)
   - 📄 **Generated script** cards with syntax-highlighted GDScript (from `generate_script` tool)
   - 🎬 **Scene definition** card (from `create_scene` tool)
   - Text summary from the agent
4. **Click the "Generated Files" tab** in the right panel to see all files in a code browser
5. **Try "Copy" buttons** — verify code copies to clipboard

### What to look for:

| What | Expected | If Not Working |
|------|----------|----------------|
| Suggestion buttons | Trigger chat | Check `sendMessage` is imported from `@ai-sdk/react` |
| Agent responds | Streaming text appears | Check `ANTHROPIC_API_KEY` in `.env.local` |
| Tool cards show | Blue/green/purple cards | Check `message.parts` rendering in chat-panel |
| Code blocks | Syntax highlighted GDScript | Check tool `execute` functions return `code` |
| Generated Files tab | Shows file browser | Check `useChat()` shares state (same default chat) |

### Troubleshooting:

**Error: "stopWhen is not exported from 'ai'"**
→ Use `maxSteps: 10` instead (see fallback in section 2.3)

**Error: "convertToModelMessages is not a function"**
→ Your AI SDK version might not have it. Try:
```typescript
// Alternative: pass messages directly
messages: messages,
// Instead of: messages: await convertToModelMessages(messages),
```

**Error: "Cannot read properties of undefined (reading 'parts')"**
→ The fallback rendering in chat-panel handles this. Make sure the `!message.parts` check is there.

**Chat sends but gets no response / 500 error**
→ Check the terminal where `pnpm dev` is running for error details
→ Verify `ANTHROPIC_API_KEY` is set correctly in `.env.local`
→ Test the API directly:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","parts":[{"type":"text","text":"Hello"}],"id":"test-1"}]}'
```

---

## 2.9 — Known Adaptations

Your project has some differences from the Step 1 guide that are important:

| Aspect | Step 1 Guide | Your Actual Setup |
|--------|-------------|-------------------|
| Next.js version | 15.x | **16.1.6** |
| React version | 19.x | **19.2.4** |
| AI SDK | ai@6 (beta) | **ai@6.0.72** |
| React hook package | ai/react | **@ai-sdk/react@3.0.75** |
| Tailwind | 3.x | **4.1.18** (needs @tailwindcss/postcss) |
| useChat API | handleSubmit | **sendMessage({ text })** |
| Message format | message.content | **message.parts[]** |
| Stream response | toDataStreamResponse | **toUIMessageStreamResponse** |
| Supabase client dir | src/lib/db/ | **src/lib/supabase/** |
| utils import | @/lib/utils/cn | **@/lib/utils** (check your actual path) |

**Adjust import paths as needed** — if `cn` lives at `src/lib/utils.ts`, import from `@/lib/utils`. If it's at `src/lib/utils/cn.ts`, import from `@/lib/utils/cn`.

---

## ✅ Step 2 Checklist

After completing all actions above, verify:

- [ ] `pnpm dev` runs without errors
- [ ] Clicking suggestion prompts sends a message
- [ ] Agent responds with streaming text
- [ ] 📋 Build Plan card appears (explain_approach tool)
- [ ] 📄 Generated script cards show with code (generate_script tool)
- [ ] Code has line numbers and basic syntax highlighting
- [ ] Copy button works on code cards
- [ ] "Generated Files" tab shows file browser with code viewer
- [ ] Agent completes multi-step generation (plan → scripts → scenes → summary)
- [ ] No errors in browser console or terminal

---

## Next: Step 3 — Godot WASM Integration

Once chat + Code Agent is working, the next step is the *magic moment*: taking the generated GDScript and actually running it in Godot. This involves:

1. Compiling Godot 4.x to WebAssembly (stripped build)
2. Creating the JavaScript ↔ Godot bridge
3. Injecting generated scripts into the running engine
4. The "Play" button comes alive!

**This is where GameAIgents becomes real — tell me when Step 2 is verified and we'll make it happen!** 🎮
