import { create } from 'zustand';
import { type Status, type Comment } from '../data/types';
import { seedIssues, users } from '../data/seed';
import { type AgentEngine } from '../agent/agentEngine';
import { type AgentStep } from '../agent/agentSteps';

const currentUser = users[0]!;
const rovoUltra = users[2]!;

// Module-level reference to the current engine for cancellation
let currentEngine: AgentEngine | null = null;

export interface AgentRunState {
  issueKey: string;
  steps: AgentStep[];
  currentStepIndex: number;
  streamingText: string;
  status: 'idle' | 'running' | 'cancelled' | 'complete';
}

interface DemoState {
  issues: typeof seedIssues;
  comments: Comment[];
  selectedIssueKey: string | null;
  sidebarCollapsed: boolean;
  autopilotEnabled: boolean;
  agentRun: AgentRunState | null;
  setIssueStatus: (key: string, status: Status) => void;
  moveIssue: (key: string, status: Status) => void;
  addComment: (issueId: string, body: string) => void;
  openIssue: (key: string) => void;
  closeIssue: () => void;
  toggleSidebar: () => void;
  toggleAutopilot: () => void;
  startAgent: (issueKey: string, engine: AgentEngine) => void;
  cancelAgent: () => void;
  completeAgent: (issueKey: string) => void;
  reset: () => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  issues: [...seedIssues],
  comments: [],
  selectedIssueKey: null,
  sidebarCollapsed: false,
  autopilotEnabled: false,
  agentRun: null,

  setIssueStatus: (key, status) =>
    set((s) => ({
      issues: s.issues.map((i) => (i.key === key ? { ...i, status } : i)),
    })),

  moveIssue: (key, status) =>
    set((s) => ({
      issues: s.issues.map((i) => (i.key === key ? { ...i, status } : i)),
    })),

  addComment: (issueId, body) =>
    set((s) => ({
      comments: [
        ...s.comments,
        {
          id: `c${Date.now()}`,
          issueId,
          author: currentUser,
          body,
          createdAt: new Date(),
        },
      ],
    })),

  openIssue: (key) => set({ selectedIssueKey: key }),
  closeIssue: () => set({ selectedIssueKey: null }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  toggleAutopilot: () => set((s) => ({ autopilotEnabled: !s.autopilotEnabled })),

  startAgent: (issueKey, engine) => {
    const issue = useDemoStore.getState().issues.find((i) => i.key === issueKey);
    if (!issue) return;

    currentEngine = engine;

    set({
      agentRun: {
        issueKey,
        steps: [],
        currentStepIndex: 0,
        streamingText: '',
        status: 'idle',
      },
    });

    engine.start(issueKey);

    // Poll for completion
    const checkInterval = setInterval(() => {
      const run = useDemoStore.getState().agentRun;
      if (run?.status === 'complete') {
        clearInterval(checkInterval);
        useDemoStore.getState().completeAgent(issueKey);
      } else if (run?.status === 'cancelled') {
        clearInterval(checkInterval);
      }
    }, 200);
  },

  cancelAgent: () => {
    if (currentEngine) {
      currentEngine.cancel();
      currentEngine = null;
    }
    set({ agentRun: null });
  },

  completeAgent: (issueKey) => {
    currentEngine = null;
    set((s) => ({
      issues: s.issues.map((i) => (i.key === issueKey ? { ...i, status: 'done' as Status } : i)),
      comments: [
        ...s.comments,
        {
          id: `c${Date.now()}`,
          issueId: s.issues.find((i) => i.key === issueKey)?.id ?? '',
          author: rovoUltra,
          body: '🤖 Agent run complete! Implementation shipped to production. All 847 tests passing. Code coverage: 100%. Vibes: approved.',
          createdAt: new Date(),
        },
      ],
      agentRun: null,
    }));
  },

  reset: () =>
    set({
      issues: [...seedIssues],
      comments: [],
      selectedIssueKey: null,
      sidebarCollapsed: false,
      autopilotEnabled: false,
      agentRun: null,
    }),
}));
