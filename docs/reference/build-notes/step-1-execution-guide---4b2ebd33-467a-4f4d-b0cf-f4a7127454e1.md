# Step 1: Project Scaffolding — Execution Guide

## Overview
This guide walks you through setting up the GameAIgents project foundation. Execute these steps in order using Cursor with Claude Code.

**Time estimate**: 45-60 minutes
**Prerequisites**: Node.js 20+, pnpm installed, GitHub repo ready with new branch

---

## 1.1 — Initialize Next.js 15 Project

Open your terminal in the `gameaigent` folder (your existing repo root) and run:

```bash
# Make sure you're on your new branch
git status

# Initialize Next.js 15 with all the right options
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack

# If the folder isn't empty, Next.js will ask — choose "Yes" to proceed
```

**Expected result**: Next.js project with App Router, TypeScript, Tailwind CSS, ESLint, and src/ directory.

---

## 1.2 — Install Core Dependencies

```bash
# AI & Agent Framework
pnpm add ai @ai-sdk/anthropic @ai-sdk/openai

# Database & Auth
pnpm add @supabase/supabase-js @supabase/ssr

# UI Components (shadcn/ui foundation)
pnpm add class-variance-authority clsx tailwind-merge lucide-react

# Utilities
pnpm add zod nanoid date-fns

# Dev Dependencies
pnpm add -D @types/node prettier
```

**Note on AI SDK 6**: As of Feb 2026, AI SDK 6 is in beta. If the `ai` package installs v5, run:
```bash
pnpm add ai@beta
```

**Note on LangGraph**: We're NOT installing LangGraph yet. For the MVP, Vercel AI SDK 6's ToolLoopAgent is sufficient for our single Code Agent. LangGraph comes in Phase 2 when we need multi-agent state machines.

---

## 1.3 — Initialize shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

When prompted, choose:
- Style: **New York**
- Base color: **Zinc**
- CSS variables: **Yes**

Then install the components we'll need immediately:

```bash
pnpm dlx shadcn@latest add button input textarea card avatar badge scroll-area separator sheet dialog dropdown-menu tooltip tabs
```

---

## 1.4 — Create Project Structure

Run these commands to create the full directory structure:

```bash
# App routes
mkdir -p src/app/\(auth\)/login
mkdir -p src/app/\(auth\)/signup
mkdir -p src/app/\(studio\)/studio
mkdir -p src/app/\(studio\)/project/\[id\]
mkdir -p src/app/\(marketing\)
mkdir -p src/app/api/chat
mkdir -p src/app/api/generate
mkdir -p src/app/api/project
mkdir -p src/app/play/\[id\]

# Agent definitions
mkdir -p src/agents

# Library modules
mkdir -p src/lib/ai
mkdir -p src/lib/godot
mkdir -p src/lib/db
mkdir -p src/lib/utils

# Components
mkdir -p src/components/chat
mkdir -p src/components/canvas
mkdir -p src/components/studio
mkdir -p src/components/ui
mkdir -p src/components/marketing

# Godot WASM assets (will hold compiled engine)
mkdir -p public/godot

# Project documentation (BMAD style)
mkdir -p docs/stories
mkdir -p docs/architecture

# Types
mkdir -p src/types
```

---

## 1.5 — Configuration Files

### `.env.local` (create in project root — DO NOT COMMIT)

```env
# Anthropic (Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# OpenAI (GPT-4o, DALL-E 3)
OPENAI_API_KEY=your_openai_api_key_here

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GameAIgents

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_MULTIPLAYER=false
```

### `.env.example` (commit this — template for other devs)

```env
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=GameAIgents
NEXT_PUBLIC_ENABLE_VOICE=false
NEXT_PUBLIC_ENABLE_MULTIPLAYER=false
```

### `.gitignore` additions

Add these lines to the existing `.gitignore`:

```
# Environment
.env.local
.env.*.local

# Godot build artifacts
public/godot/*.wasm
public/godot/*.pck
!public/godot/.gitkeep

# IDE
.cursor/
.vscode/settings.json

# Supabase
supabase/.temp/
```

---

## 1.6 — Core Source Files

The following files establish the foundation. Create each one in order.

---

### File: `src/types/index.ts`

```typescript
// Core domain types for GameAIgents

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  game_type: GameType;
  status: ProjectStatus;
  settings: GameSettings;
  created_at: string;
  updated_at: string;
}

export type GameType = 
  | 'top-down-action'
  | 'platformer'
  | 'puzzle'
  | 'rpg'
  | 'custom';

export type ProjectStatus = 
  | 'draft'
  | 'generating'
  | 'playable'
  | 'published';

export interface GameSettings {
  resolution: { width: number; height: number };
  target_fps: number;
  art_style: string;
  color_palette: string[];
}

export interface GenerationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: {
    agent?: string;
    files_changed?: string[];
    generation_time_ms?: number;
  };
  created_at: string;
}

export interface GameFile {
  id: string;
  project_id: string;
  path: string;          // e.g., "scripts/player.gd"
  content: string;
  file_type: 'gdscript' | 'scene' | 'resource' | 'asset';
  version: number;
  created_at: string;
  updated_at: string;
}

export interface AgentAction {
  agent: 'code' | 'asset' | 'level' | 'qa' | 'orchestrator';
  action: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'failed';
  duration_ms?: number;
}
```

---

### File: `src/lib/utils/cn.ts`

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

### File: `src/lib/db/supabase-client.ts`

```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

---

### File: `src/lib/db/supabase-server.ts`

```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing sessions.
          }
        },
      },
    }
  );
}
```

---

### File: `src/lib/ai/models.ts`

```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';

// Model registry — single source of truth for all AI model references
// Using Vercel AI SDK's provider-agnostic model switching

export const models = {
  // Primary reasoning & code generation
  codeGeneration: anthropic('claude-sonnet-4-20250514'),
  
  // Planning & orchestration
  orchestrator: anthropic('claude-sonnet-4-20250514'),
  
  // Fast responses for simple queries
  fast: anthropic('claude-haiku-4-5-20251001'),
  
  // Image generation
  imageGeneration: openai('dall-e-3'),
  
  // Alternative code generation (for A/B testing or fallback)
  codeGenerationAlt: openai('gpt-4o'),
} as const;

export type ModelKey = keyof typeof models;
```

---

### File: `src/agents/code-agent.ts`

```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { models } from '@/lib/ai/models';

// GDScript Code Agent — The first and most critical agent
// Generates Godot 4.x GDScript code from natural language descriptions

export const CODE_AGENT_SYSTEM_PROMPT = `You are the GameAIgents Code Agent — an expert GDScript developer for Godot 4.x.

YOUR ROLE:
You generate complete, runnable GDScript code for Godot 4.x game projects. You specialize in 2D top-down action games (similar to Brawl Stars, Enter the Gungeon, Archvale).

CORE RULES:
1. Always output COMPLETE, RUNNABLE GDScript files — never partial snippets
2. Use Godot 4.x syntax (GDScript 2.0) — typed variables, @onready, @export
3. Follow Godot best practices:
   - Use signals for communication between nodes
   - Use @export for designer-tunable parameters
   - Use node groups for efficient queries
   - Cache node references in _ready()
   - Use physics_process for movement, process for non-physics logic
4. Every script must include:
   - class_name declaration
   - Clear comments explaining the purpose
   - @export variables for tunable parameters
   - Proper signal declarations
5. For top-down action games, always consider:
   - 8-directional movement with proper animation states
   - Collision layers: Player (1), Enemies (2), Projectiles (3), Environment (4)
   - Health/damage systems with invincibility frames
   - Camera following with smoothing

OUTPUT FORMAT:
When generating code, use the generate_script tool to output each file.
When modifying existing code, use the modify_script tool.
When creating scene structure, use the create_scene tool.

GAME CONTEXT:
The user is building a 2D top-down action game. Think Brawl Stars meets Enter the Gungeon.
Keep it fun, responsive, and juicy (screen shake, particles, feedback).`;

// Tool definitions for the Code Agent
export const codeAgentTools = {
  generate_script: tool({
    description: 'Generate a complete GDScript file for a Godot 4.x node',
    parameters: z.object({
      file_path: z.string().describe('Path relative to project root, e.g., "scripts/player.gd"'),
      node_type: z.string().describe('Godot node type this script extends, e.g., "CharacterBody2D"'),
      description: z.string().describe('Brief description of what this script does'),
      code: z.string().describe('Complete GDScript code'),
      dependencies: z.array(z.string()).optional().describe('Other scripts/scenes this depends on'),
    }),
  }),

  modify_script: tool({
    description: 'Modify an existing GDScript file',
    parameters: z.object({
      file_path: z.string().describe('Path to the existing script'),
      changes: z.array(z.object({
        description: z.string(),
        old_code: z.string().optional(),
        new_code: z.string(),
        location: z.enum(['replace', 'insert_before', 'insert_after', 'append']),
      })),
      reason: z.string().describe('Why this modification is needed'),
    }),
  }),

  create_scene: tool({
    description: 'Define a Godot scene structure (node tree) in .tscn format description',
    parameters: z.object({
      scene_path: z.string().describe('Path for the scene file, e.g., "scenes/player.tscn"'),
      root_node: z.object({
        type: z.string().describe('Node type, e.g., "CharacterBody2D"'),
        name: z.string().describe('Node name'),
        script: z.string().optional().describe('Attached script path'),
        properties: z.record(z.unknown()).optional(),
        children: z.array(z.lazy(() => z.object({
          type: z.string(),
          name: z.string(),
          script: z.string().optional(),
          properties: z.record(z.unknown()).optional(),
        }))).optional(),
      }),
      description: z.string().describe('What this scene represents in the game'),
    }),
  }),

  explain_approach: tool({
    description: 'Explain the technical approach before generating code',
    parameters: z.object({
      summary: z.string().describe('Brief summary of what will be built'),
      components: z.array(z.object({
        name: z.string(),
        purpose: z.string(),
        node_type: z.string(),
      })),
      architecture_notes: z.string().optional(),
    }),
  }),
};

// Agent configuration for use with Vercel AI SDK 6
export const codeAgentConfig = {
  model: models.codeGeneration,
  system: CODE_AGENT_SYSTEM_PROMPT,
  tools: codeAgentTools,
  maxSteps: 10, // Maximum tool calls per generation
};
```

---

### File: `src/app/api/chat/route.ts`

```typescript
import { streamText } from 'ai';
import { codeAgentConfig } from '@/agents/code-agent';

export const maxDuration = 60; // Allow up to 60 seconds for generation

export async function POST(req: Request) {
  const { messages, projectId } = await req.json();

  // For MVP, we route everything through the Code Agent
  // In Phase 2, the Orchestrator Agent will parse intent and route to specialized agents
  
  const result = streamText({
    ...codeAgentConfig,
    messages,
    // Tool execution results are handled by the AI SDK's agentic loop
    // The agent will call tools (generate_script, etc.) and the SDK
    // automatically appends results and continues generation
    onFinish: async ({ text, toolCalls, toolResults }) => {
      // TODO: Save generation to database
      // TODO: Send generated files to Godot WASM bridge
      console.log(`[Code Agent] Generation complete. Tools called: ${toolCalls.length}`);
    },
  });

  return result.toDataStreamResponse();
}
```

---

### File: `src/app/(studio)/studio/page.tsx`

```tsx
import { StudioLayout } from '@/components/studio/studio-layout';

export default function StudioPage() {
  return <StudioLayout />;
}
```

---

### File: `src/components/studio/studio-layout.tsx`

```tsx
'use client';

import { useState } from 'react';
import { ChatPanel } from '@/components/chat/chat-panel';
import { GameCanvas } from '@/components/canvas/game-canvas';
import { cn } from '@/lib/utils/cn';

export function StudioLayout() {
  const [chatWidth, setChatWidth] = useState(400);

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100">
      {/* Chat Panel — Left Side */}
      <div 
        className="flex flex-col border-r border-zinc-800"
        style={{ width: chatWidth, minWidth: 320, maxWidth: 600 }}
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

      {/* Game Canvas — Right Side */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
          <span className="text-sm font-medium text-zinc-300">Game Preview</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 rounded-md transition-colors">
              ▶ Play
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-zinc-700 hover:bg-zinc-600 rounded-md transition-colors">
              Share
            </button>
          </div>
        </div>
        <GameCanvas />
      </div>
    </div>
  );
}
```

---

### File: `src/components/chat/chat-panel.tsx`

```tsx
'use client';

import { useChat } from 'ai/react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';

export function ChatPanel() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
                "Create a top-down shooter where I control a knight",
                "Make a Brawl Stars-style arena with 3 characters",
                "Build a dungeon crawler with enemies and loot",
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => {
                    handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLTextAreaElement>);
                  }}
                  className="block w-full text-left text-xs text-zinc-400 hover:text-zinc-200 
                             bg-zinc-800/50 hover:bg-zinc-800 rounded-lg px-3 py-2 
                             transition-colors border border-zinc-800 hover:border-zinc-700"
                >
                  "{suggestion}"
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
                'max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
              )}
            >
              {/* TODO: Render tool calls (code blocks, file generations) specially */}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
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
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
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
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

### File: `src/components/canvas/game-canvas.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// Godot WASM Canvas — This will hold the embedded Godot engine
// For MVP Phase 1, we start with a placeholder that shows generated code
// The actual Godot WASM integration comes in Step 4

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGodotLoaded, setIsGodotLoaded] = useState(false);

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-900 relative">
      {!isGodotLoaded ? (
        // Placeholder until Godot WASM is integrated
        <div className="text-center px-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-zinc-800 border border-zinc-700 
                          flex items-center justify-center">
            <span className="text-4xl">🎮</span>
          </div>
          <h3 className="text-lg font-semibold text-zinc-300 mb-2">
            Game Canvas
          </h3>
          <p className="text-sm text-zinc-500 max-w-sm">
            Your game will appear here as you describe it. 
            Start a conversation to generate your first game!
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 max-w-xs mx-auto">
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-500">Resolution</div>
              <div className="text-sm text-zinc-300 font-mono">1280×720</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-500">Target FPS</div>
              <div className="text-sm text-zinc-300 font-mono">60</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-500">Engine</div>
              <div className="text-sm text-zinc-300 font-mono">Godot 4.4</div>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-800">
              <div className="text-xs text-zinc-500">Type</div>
              <div className="text-sm text-zinc-300 font-mono">Top-Down</div>
            </div>
          </div>
        </div>
      ) : (
        <canvas 
          ref={canvasRef}
          id="godot-canvas"
          className="w-full h-full"
          tabIndex={-1}
        />
      )}
      
      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between 
                      px-4 py-2 bg-zinc-950/80 border-t border-zinc-800 text-xs text-zinc-500">
        <span>Engine: {isGodotLoaded ? 'Godot 4.4 WASM' : 'Not loaded'}</span>
        <span>MVP v0.1.0</span>
      </div>
    </div>
  );
}
```

---

### File: `src/app/layout.tsx` (replace default)

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GameAIgents — AI-Powered Game Creator Studio",
  description: "Build complex, playable games through natural language conversation. Powered by AI agents and Godot Engine.",
  keywords: ["game development", "AI", "game maker", "no-code", "Godot", "game builder"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

---

### File: `src/app/page.tsx` (replace default — temporary redirect to studio)

```tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // For MVP, go straight to the studio
  // Landing page comes later
  redirect('/studio');
}
```

---

### File: `src/app/globals.css` (replace default)

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 6%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 6%;
    --popover-foreground: 0 0% 98%;
    --primary: 160 84% 39%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 160 84% 39%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Godot Canvas Styles */
#godot-canvas {
  display: block;
  image-rendering: pixelated;
}

/* Custom scrollbar for chat */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(63, 63, 70);
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(82, 82, 91);
}
```

---

### File: `docs/prd.md` (BMAD documentation)

```markdown
# GameAIgents — Product Requirements Document

## Vision
Democratize game creation by transforming ideas into playable, shareable games through conversation.

## Product Goal
Build a standalone, web-based AI platform where users can generate games using natural language prompts.
The embedded Godot engine (WASM) provides real-time preview and instant playability.

## Target Audience
- **Primary**: Young creators (13-25) — creative, loves games, can't code
- **Secondary**: Indie developers — rapid prototyping
- **Tertiary**: Educators — teaching game design

## MVP Scope
- Text-based chat interface
- Single Code Agent (GDScript generation)
- Godot WASM canvas with live preview
- Basic asset generation (AI sprites)
- One-click play & share
- Project persistence (Supabase)
- Email + Google Auth

## First Demo Target
2D top-down action game (Brawl Stars-inspired):
- Character with 8-directional movement
- Basic shooting mechanics
- Simple arena with walls/obstacles
- Health system with visual feedback
- Enemy AI (follow + attack pattern)

## Success Criteria
- User can describe a game and see it running in < 60 seconds
- Generated games are playable and fun
- Share link works for anyone with a browser
```

---

## 1.7 — First Deployment

After creating all files:

```bash
# Verify everything compiles
pnpm dev

# Visit http://localhost:3000 — should redirect to /studio and show the UI

# Commit and push
git add -A
git commit -m "feat: initial project scaffolding with AI SDK 6, Supabase, and studio layout"
git push origin your-branch-name

# Vercel will auto-deploy from your GitHub push
```

---

## 1.8 — Supabase Database Setup

Go to https://supabase.com and create a new project. Then run this SQL in the SQL editor:

```sql
-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  game_type text default 'top-down-action',
  status text default 'draft',
  settings jsonb default '{"resolution": {"width": 1280, "height": 720}, "target_fps": 60, "art_style": "pixel", "color_palette": []}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Game files (scripts, scenes, assets)
create table public.game_files (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  path text not null,
  content text not null,
  file_type text not null,
  version integer default 1,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(project_id, path)
);

-- Chat sessions
create table public.chat_sessions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  messages jsonb default '[]',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Generation history (for the data flywheel)
create table public.generations (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_prompt text not null,
  agent text not null,
  model text not null,
  tool_calls jsonb default '[]',
  output_files text[] default '{}',
  duration_ms integer,
  tokens_used integer,
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.projects enable row level security;
alter table public.game_files enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.generations enable row level security;

-- RLS Policies: Users can only access their own data
create policy "Users can view own projects" on public.projects
  for select using (auth.uid() = user_id);

create policy "Users can create own projects" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "Users can update own projects" on public.projects
  for update using (auth.uid() = user_id);

create policy "Users can delete own projects" on public.projects
  for delete using (auth.uid() = user_id);

-- Game files inherit project access
create policy "Users can access own game files" on public.game_files
  for all using (
    exists (
      select 1 from public.projects
      where projects.id = game_files.project_id
      and projects.user_id = auth.uid()
    )
  );

-- Chat sessions inherit project access
create policy "Users can access own chat sessions" on public.chat_sessions
  for all using (
    exists (
      select 1 from public.projects
      where projects.id = chat_sessions.project_id
      and projects.user_id = auth.uid()
    )
  );

-- Generations inherit project access
create policy "Users can access own generations" on public.generations
  for all using (
    exists (
      select 1 from public.projects
      where projects.id = generations.project_id
      and projects.user_id = auth.uid()
    )
  );

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function update_updated_at();

create trigger game_files_updated_at
  before update on public.game_files
  for each row execute function update_updated_at();

create trigger chat_sessions_updated_at
  before update on public.chat_sessions
  for each row execute function update_updated_at();
```

---

## ✅ Step 1 Checklist

After completing all actions above, verify:

- [ ] `pnpm dev` runs without errors
- [ ] http://localhost:3000 redirects to /studio
- [ ] Studio layout shows Chat Panel (left) + Game Canvas (right)
- [ ] Chat input is functional (typing, suggestions clickable)
- [ ] Chat API route exists at /api/chat (will need API key to test)
- [ ] Supabase project created with tables and RLS
- [ ] Environment variables set in .env.local
- [ ] Git committed and pushed
- [ ] Vercel deployment successful (preview URL works)

---

## Next: Step 2 — Getting Chat + Code Agent Working

Once Step 1 is verified, we move to making the chat actually generate GDScript. This involves:
1. Adding your Anthropic API key
2. Testing the Code Agent with real prompts
3. Rendering tool call results (code blocks) in the chat UI
4. Building the file viewer panel

**Tell me when Step 1 is complete and we'll move to Step 2!**
