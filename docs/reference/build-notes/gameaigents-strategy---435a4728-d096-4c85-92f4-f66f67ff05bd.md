# GameAIgents: Development Strategy & Implementation Guide

## 🎯 Executive Strategy Summary

After analyzing all project documents — the original PRD, revised PRD & strategy, feasibility assessment, re-evaluated business model, market research (Feb 2026), BMAD methodology for game development (Godot & Unity), and the competitive landscape — here is the synthesized strategy for building GameAIgents.

**The Core Thesis**: GameAIgents is a standalone, web-based AI Creator Studio where anyone can build complex, playable games through natural language conversation. It embeds Godot Engine via WebAssembly, orchestrates multiple specialized AI agents, and differentiates from Rosebud AI by targeting *complex game types* (Brawl Stars-style action, multiplayer, RPG systems) rather than simple platformers and visual novels.

---

## 1. Strategic Architecture Decision Matrix

### What We're Building (Validated by All Documents)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Product Type** | Standalone Web App (Creator Studio) | Not a Unity/Godot plugin — full control over UX |
| **Game Engine** | Godot 4.x → WASM | MIT license, embeddable, web-native, 720p WASM SIMD boost |
| **Frontend** | Next.js 15 (App Router) on Vercel | Best AI SDK integration, streaming, edge functions |
| **Agent Framework** | Vercel AI SDK 6 + LangGraph | AI SDK 6 has Agent abstraction; LangGraph for complex multi-step orchestration |
| **AI Gateway** | Vercel AI Gateway | Provider-agnostic model switching (Claude, GPT, Gemini) |
| **Orchestration** | Multi-agent pipeline | Code Agent → Asset Agent → Level Agent → QA Agent |
| **Voice** | Web Speech API → Whisper fallback | Browser-native first, server fallback for accuracy |
| **Database** | Supabase (Postgres + Auth + Storage) | Real-time, auth built-in, file storage for game assets |
| **Deployment** | Vercel (frontend) + Supabase (backend) | Serverless scaling, Fluid Compute for agent workflows |
| **Durable Workflows** | Vercel Workflow DevKit | Agent loops that survive timeouts, resume after crashes |
| **Real-time** | WebSockets (Godot ↔ Web bridge) | Live game preview updates as AI generates code |

### Why NOT LangChain Alone?

The Vercel AI SDK 6 now has first-class Agent abstraction with tool-calling loops, human-in-the-loop approval, and streaming UI. LangGraph adds value for *complex stateful workflows* (multi-agent routing, conditional branching, cycles). The hybrid approach gives us the best of both: clean UI streaming from AI SDK + sophisticated orchestration from LangGraph.

---

## 2. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   GAMEAIGENTS WEB APP                     │
│                  (Next.js 15 on Vercel)                   │
├─────────────┬───────────────────┬───────────────────────┤
│  Chat UI    │  Game Canvas      │  Tuning Panel         │
│  (React)    │  (Godot WASM)     │  (Sliders/Controls)   │
│             │                   │                       │
│  Voice Input│  Live Preview     │  Asset Gallery        │
│  Text Input │  Play/Share       │  Code Inspector       │
└──────┬──────┴────────┬──────────┴───────────┬───────────┘
       │               │                      │
       ▼               ▼                      ▼
┌──────────────────────────────────────────────────────────┐
│              API LAYER (Next.js API Routes)               │
│         Vercel Fluid Compute + Workflow DevKit            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────┐         │
│  │        AI ORCHESTRATOR (LangGraph)          │         │
│  │     Intent Parser → Task Planner → Router   │         │
│  └───────┬────────┬────────┬──────────┬────────┘         │
│          ▼        ▼        ▼          ▼                  │
│  ┌──────────┐ ┌────────┐ ┌────────┐ ┌──────┐            │
│  │Code Agent│ │Art     │ │Level   │ │QA    │            │
│  │(GDScript)│ │Agent   │ │Agent   │ │Agent │            │
│  │(AI SDK 6)│ │(AI SDK)│ │(AI SDK)│ │(SDK) │            │
│  └──────────┘ └────────┘ └────────┘ └──────┘            │
│                                                          │
│  Models: Claude Sonnet 4 | GPT-4o | Stable Diffusion    │
│  Via: Vercel AI Gateway (provider-agnostic switching)    │
│                                                          │
├──────────────────────────────────────────────────────────┤
│              DATA LAYER                                   │
│  Supabase Postgres │ Supabase Storage │ Supabase Auth    │
│  (Projects, Users) │ (Assets, Games)  │ (OAuth, Magic)   │
└──────────────────────────────────────────────────────────┘
```

---

## 3. The Multi-Agent Architecture (Detailed)

### Agent Definitions (Using Vercel AI SDK 6 ToolLoopAgent)

```
ORCHESTRATOR AGENT (Router/Planner)
├── Receives: User intent (text/voice)
├── Produces: Task plan with agent assignments
├── Model: Claude Sonnet (best at planning/reasoning)
│
├── CODE AGENT
│   ├── Specialty: GDScript/C# generation for Godot
│   ├── Context: Current scene tree, existing scripts, Godot API docs
│   ├── Model: Claude Sonnet (code) or GPT-4o (alternatives)
│   ├── Tools: write_script, modify_script, debug_script
│   └── Output: GDScript files injected into Godot WASM
│
├── ASSET AGENT
│   ├── Specialty: 2D sprites, textures, UI elements
│   ├── Context: Art style guide, existing assets, color palette
│   ├── Model: DALL-E 3 / Stable Diffusion / Scenario API
│   ├── Tools: generate_sprite, generate_texture, generate_ui
│   └── Output: PNG/SVG files loaded into Godot resources
│
├── LEVEL AGENT
│   ├── Specialty: Scene composition, level layout, tile maps
│   ├── Context: Game mechanics, player progression, difficulty
│   ├── Model: Claude (spatial reasoning) + procedural gen
│   ├── Tools: create_scene, place_objects, set_properties
│   └── Output: Godot .tscn scene files
│
├── CHARACTER AGENT (Future - AI NPCs)
│   ├── Specialty: NPC behaviors, dialogue, AI personalities
│   ├── Model: Claude / fine-tuned model
│   └── Output: Behavior trees, dialogue scripts
│
└── QA AGENT
    ├── Specialty: Automated playtesting, bug detection
    ├── Context: Game rules, expected behaviors, perf targets
    ├── Model: Claude (analysis) + automated test runners
    └── Output: Bug reports, performance metrics, suggestions
```

### Agent Communication Flow (LangGraph State Machine)

```
USER_INPUT → PARSE_INTENT → PLAN_TASKS → ROUTE_TO_AGENTS
                                              │
                    ┌─────────────┬────────────┼────────────┐
                    ▼             ▼            ▼            ▼
               CODE_AGENT    ASSET_AGENT  LEVEL_AGENT   QA_AGENT
                    │             │            │            │
                    └─────────────┴────────────┴────────────┘
                                              │
                                    MERGE_RESULTS
                                              │
                                    INJECT_INTO_GODOT
                                              │
                                    UPDATE_PREVIEW
                                              │
                              ┌────────────────┴───────────┐
                              ▼                            ▼
                         USER_HAPPY?              ITERATE (loop back)
                              │
                           SAVE_PROJECT
```

---

## 4. MVP Scope (Phase 1 — "The Magical Moment")

Based on the revised strategy, the MVP must deliver ONE magical moment: **"I said something, and a game appeared."**

### MVP Features (Weeks 1-12)

1. **Chat Interface** — Text input describing a game idea
2. **Single Code Agent** — Generates GDScript for simple 2D games
3. **Godot WASM Canvas** — Live preview of the generated game
4. **JS ↔ Godot Bridge** — Commands from web app control Godot
5. **One-Click Play** — Test the game instantly in browser
6. **One-Click Share** — Generate a URL anyone can play
7. **Basic Asset Generation** — Simple sprites via AI image gen
8. **Project Persistence** — Save/load projects (Supabase)
9. **User Auth** — Sign up, sign in (Supabase Auth)

### MVP Non-Goals (Deferred)
- Voice control (Phase 2)
- Multi-agent orchestration (Phase 2 — MVP uses single Code Agent)
- Multiplayer networking (Phase 3)
- Advanced asset pipeline (Phase 2)
- Marketplace (shelved per revised business plan)
- Enterprise features (Phase 4)

---

## 5. Development Toolchain & Workflow

### Design Phase Tools

| Tool | Purpose | When |
|------|---------|------|
| **Relume.io** | AI-powered sitemap + wireframe generation | Week 1 — Generate information architecture and page wireframes |
| **Figma** | High-fidelity UI/UX design | Week 2-3 — Design the Creator Studio interface |
| **Claude (this chat)** | Architecture decisions, specs, planning | Ongoing — Orchestrator role |

### Development Phase Tools

| Tool | Purpose | When |
|------|---------|------|
| **Cursor** | Primary IDE with AI agents | All coding — Claude Code + Cursor agents for implementation |
| **Claude Code (extension)** | Agentic coding in Cursor | Complex implementations, multi-file changes |
| **Gemini CLI** | Alternative AI for code review | Cross-verification of architecture decisions |
| **Codex (extension)** | Code generation assistance | Boilerplate, repetitive patterns |
| **Antigravity** | Cursor extension | Enhanced development workflows |
| **VSCode** | Secondary IDE | Godot GDScript development (better Godot plugin support) |
| **GitHub** | Version control | Already set up — new branch for MVP |
| **Vercel** | Deployment & hosting | CI/CD from GitHub, preview deployments |

### BMAD Method Integration

The BMAD methodology provides our project management framework:

1. **You** = "Creator Experience CEO" (Product Owner)
2. **Claude (me)** = Orchestrator Agent (directing specialized agents)
3. **Cursor/Claude Code** = Developer Agent (implementation)
4. **QA processes** = QA Agent (testing, validation)

We follow the BMAD game development cycle:
- **Story Creation** → **Implementation (TDD)** → **QA Review** → **Next Story**

---

## 6. Step-by-Step Implementation Plan

### PHASE 0: Foundation Setup (Week 1)

#### Step 1: Project Scaffolding ← WE START HERE
- [ ] Initialize Next.js 15 project with App Router in the `gameaigent` folder
- [ ] Configure TypeScript, ESLint, Tailwind CSS
- [ ] Set up Vercel project & link to GitHub repo
- [ ] Install core dependencies:
  - `ai` (Vercel AI SDK 6)
  - `@ai-sdk/anthropic` (Claude provider)
  - `@ai-sdk/openai` (GPT provider)
  - `@langchain/langgraph` (complex orchestration — Phase 2)
  - `@supabase/supabase-js` (database)
  - `next-auth` (authentication)
- [ ] Create project structure:
  ```
  gameaigent/
  ├── app/                    # Next.js App Router
  │   ├── (auth)/             # Auth pages
  │   ├── (studio)/           # Creator Studio pages
  │   │   ├── chat/           # Chat interface
  │   │   ├── canvas/         # Godot WASM canvas
  │   │   └── project/        # Project management
  │   └── api/                # API routes
  │       ├── chat/           # AI chat endpoint
  │       ├── generate/       # Code generation
  │       └── project/        # CRUD operations
  ├── agents/                 # AI agent definitions
  │   ├── orchestrator.ts     # Main router agent
  │   ├── code-agent.ts       # GDScript generator
  │   └── asset-agent.ts      # Image generator
  ├── lib/                    # Shared utilities
  │   ├── godot/              # Godot WASM bridge
  │   ├── ai/                 # AI model configs
  │   └── db/                 # Supabase client
  ├── components/             # React components
  │   ├── chat/               # Chat UI components
  │   ├── canvas/             # Game canvas components
  │   └── studio/             # Studio layout
  ├── public/
  │   └── godot/              # Godot WASM build files
  └── docs/                   # BMAD documentation
      ├── prd.md
      ├── architecture.md
      └── stories/
  ```
- [ ] Set up environment variables (.env.local)
- [ ] First Vercel deployment (empty Next.js app)
- [ ] Confirm CI/CD pipeline works

#### Step 2: Supabase Setup
- [ ] Create Supabase project
- [ ] Design initial database schema:
  - `users` (auth — handled by Supabase Auth)
  - `projects` (game projects)
  - `project_files` (GDScript, scenes, assets)
  - `generations` (AI generation history)
  - `sessions` (chat sessions)
- [ ] Set up Supabase Auth (email + OAuth providers)
- [ ] Create storage buckets (game-assets, exports)
- [ ] Configure Row Level Security policies

#### Step 3: Design & Wireframing
- [ ] Use Relume.io to generate sitemap for Creator Studio
- [ ] Generate wireframes for key pages:
  - Landing page / marketing
  - Sign up / Sign in
  - Dashboard (my projects)
  - Creator Studio (chat + canvas + tuning)
  - Game player (shared game viewer)
- [ ] Import wireframes to Figma
- [ ] Design high-fidelity mockups for Creator Studio
- [ ] Define design tokens (colors, typography, spacing)

---

### PHASE 1: Core Engine Integration (Weeks 2-4)

#### Step 4: Godot WASM Integration (The Critical Path)
- [ ] Compile stripped-down Godot 4.x to WebAssembly
  - Use Godot's HTML5 export template build process
  - Strip unnecessary modules (3D, networking for now)
  - Target: Minimal WASM bundle for 2D games
- [ ] Create React component wrapping the Godot WASM canvas
- [ ] Build the JavaScript ↔ Godot bridge:
  - `sendCommand(type, payload)` — JS → Godot
  - `onEvent(type, callback)` — Godot → JS
  - Commands: load_scene, modify_node, run_script, screenshot
- [ ] Proof of concept: Load a pre-made simple game in the canvas
- [ ] Test: Send a command from React that moves a character in Godot

#### Step 5: Chat Interface & AI Integration
- [ ] Build the chat UI component (inspired by Claude/ChatGPT)
- [ ] Create the `/api/chat` route using Vercel AI SDK 6
- [ ] Define the Code Agent using ToolLoopAgent:
  ```typescript
  // Simplified agent definition
  const codeAgent = new ToolLoopAgent({
    model: anthropic('claude-sonnet-4-20250514'),
    system: `You are a GDScript expert. Generate game code for Godot 4.x.
             Output complete, runnable GDScript files.`,
    tools: {
      generateScript: { ... },
      modifyScene: { ... },
      createNode: { ... }
    }
  });
  ```
- [ ] Implement streaming responses to chat UI
- [ ] Connect AI output → Godot WASM bridge (code injection)

#### Step 6: The First "Magic Moment"
- [ ] End-to-end flow: User types "Create a character that moves with arrow keys"
- [ ] Code Agent generates GDScript
- [ ] Script is injected into Godot WASM
- [ ] Character appears and is controllable in the canvas
- [ ] This is the MVP validation milestone

---

### PHASE 2: Core Product Features (Weeks 5-8)

#### Step 7: Asset Generation Pipeline
- [ ] Integrate AI image generation (DALL-E 3 via AI SDK)
- [ ] Build asset management:
  - Generated sprites saved to Supabase Storage
  - Thumbnail previews in the Tuning Panel
  - Drag-and-drop into game scenes
- [ ] Asset Agent definition with style consistency prompting
- [ ] Sprite sheet generation for animations

#### Step 8: Project Management
- [ ] Create/save/load projects (Supabase)
- [ ] Version history (save points)
- [ ] File browser showing project structure
- [ ] Export game as standalone HTML5 (Godot web export)

#### Step 9: Play & Share
- [ ] "Play" button — full-screen game testing in browser
- [ ] "Share" button — generate unique URL
- [ ] Shared game player page (loads game from Supabase)
- [ ] Social sharing metadata (Open Graph)

#### Step 10: Tuning Interface
- [ ] Parameter extraction from generated code
- [ ] Slider controls for numeric values (speed, jump height, health)
- [ ] Color pickers for visual properties
- [ ] Real-time preview updates as sliders change

---

### PHASE 3: Multi-Agent & Advanced Features (Weeks 9-16)

#### Step 11: Multi-Agent Orchestration
- [ ] Implement LangGraph state machine for agent routing
- [ ] Orchestrator Agent (intent parsing, task planning)
- [ ] Parallel agent execution where possible
- [ ] Agent result merging and conflict resolution
- [ ] Human-in-the-loop approval for destructive operations

#### Step 12: Voice Interface
- [ ] Web Speech API integration (browser native)
- [ ] Whisper fallback for unsupported browsers
- [ ] Voice activity detection (start/stop speaking)
- [ ] Voice command processing through existing chat pipeline
- [ ] Visual feedback (waveform, transcription preview)

#### Step 13: Level/Scene Agent
- [ ] Procedural level generation
- [ ] Tilemap creation and editing
- [ ] Scene composition from natural language descriptions
- [ ] Collision layer auto-configuration

#### Step 14: Template System
- [ ] Pre-built game templates (platformer, top-down, puzzle)
- [ ] "Start from template" option
- [ ] Template customization via conversation
- [ ] Community template sharing (future)

---

### PHASE 4: Scale & Polish (Weeks 17-24)

#### Step 15: Performance & Optimization
- [ ] Godot WASM bundle optimization (code splitting, lazy loading)
- [ ] AI response caching (common patterns)
- [ ] Edge function deployment for latency
- [ ] Progressive Web App support

#### Step 16: Subscription & Monetization
- [ ] Stripe integration via Supabase
- [ ] Free tier (limited AI operations per month)
- [ ] Indie Pro ($20/mo) — unlimited generations
- [ ] Studio ($50/mo/seat) — team features
- [ ] Usage tracking and metering

#### Step 17: Genie 3 Integration Preparation
- [ ] Monitor Google Genie 3 API availability
- [ ] Design modular agent interface for world generation swap
- [ ] Prototype: Genie 3 for "world sketching" → Godot for mechanics
- [ ] Architecture ensures seamless future integration

---

## 7. Technology Versions & Dependencies

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | Web framework |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Vercel AI SDK | 6.x (beta) | Agent abstraction, streaming |
| @ai-sdk/anthropic | latest | Claude provider |
| @ai-sdk/openai | latest | GPT/DALL-E provider |
| LangGraph | latest | Complex agent orchestration |
| Supabase | latest | Database, Auth, Storage |
| Godot Engine | 4.4.x | Game engine (WASM build) |
| Tailwind CSS | 4.x | Styling |
| shadcn/ui | latest | UI components |
| Stripe | latest | Payments |

---

## 8. Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Godot WASM bundle too large | Slow load times | Strip unused modules, lazy load, CDN caching |
| AI latency too high | Poor UX | Streaming responses, optimistic UI, edge caching |
| Vercel serverless timeout (5 min) | Agent workflows fail | Vercel Workflow DevKit for durable execution |
| Code Agent generates buggy code | Broken game preview | QA Agent validation, sandbox execution, error recovery |
| Genie 3 never gets public API | No world generation boost | Our multi-agent system works independently |
| Rosebud AI adds complex games | Competitive pressure | Data flywheel moat, voice-first differentiator, community |

---

## 9. Success Metrics (MVP)

| Metric | Target | Timeline |
|--------|--------|----------|
| Godot WASM loads in browser | < 5 seconds | Week 4 |
| First AI-generated game plays | Working demo | Week 6 |
| End-to-end create → play → share | Functional | Week 8 |
| Beta users (closed) | 50-100 | Week 12 |
| Games created per user per session | > 2 | Week 12 |
| Average session length | > 15 min | Week 12 |

---

## 10. Immediate Next Steps (Starting Now)

### Step 1 Actions (This Session)

1. **Verify your repo structure** — Check the `gameaigent` folder and branch
2. **Scaffold the Next.js 15 project** — Using Cursor with Claude Code
3. **Install core dependencies** — AI SDK 6, Supabase client, Tailwind
4. **Create the project structure** — Folders for agents, components, lib
5. **Set up Vercel project** — Link GitHub repo, configure env vars
6. **First deployment** — Empty app deployed to Vercel
7. **Begin Relume.io wireframing** — Parallel design track

**Ready to execute Step 1? Let's scaffold the project!**
