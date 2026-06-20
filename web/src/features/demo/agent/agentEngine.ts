/**
 * Deterministic agent engine with injectable timing.
 * Drives the "Implement now with AI" streaming simulation.
 */
import { generateSteps, type AgentStep } from './agentSteps';

export interface AgentRunState {
  issueKey: string;
  steps: AgentStep[];
  currentStepIndex: number;
  /** Partial text for the current streaming step */
  streamingText: string;
  status: 'idle' | 'running' | 'cancelled' | 'complete';
}

export type AgentEngineCallback = (state: AgentRunState) => void;

export class AgentEngine {
  private state: AgentRunState;
  private callback: AgentEngineCallback;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(callback: AgentEngineCallback) {
    this.callback = callback;
    this.state = {
      issueKey: '',
      steps: [],
      currentStepIndex: 0,
      streamingText: '',
      status: 'idle',
    };
  }

  start(issueKey: string) {
    this.state = {
      issueKey,
      steps: generateSteps(issueKey),
      currentStepIndex: 0,
      streamingText: '',
      status: 'running',
    };
    this.callback(this.state);
    this.runStep();
  }

  cancel() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.state.status !== 'running') return;
    this.state.status = 'cancelled';
    this.callback(this.state);
  }

  get stateIsRunning() {
    return this.state.status === 'running';
  }

  private runStep() {
    if (this.state.status !== 'running') return;
    const { steps, currentStepIndex } = this.state;
    if (currentStepIndex >= steps.length) {
      this.state.status = 'complete';
      this.callback(this.state);
      return;
    }

    const step = steps[currentStepIndex]!;
    // Stream the description as chunks of words
    const words = step.description.split(' ');
    let wordIndex = 0;

    const streamWord = () => {
      if (this.state.status !== 'running') return;
      if (wordIndex < words.length) {
        this.state.streamingText = words.slice(0, wordIndex + 1).join(' ');
        this.callback(this.state);
        wordIndex++;
        const t = setTimeout(streamWord, 80);
        this.timers.push(t);
      } else {
        // Step complete, move to next
        this.state.currentStepIndex = currentStepIndex + 1;
        this.state.streamingText = '';
        this.callback(this.state);
        const t = setTimeout(() => this.runStep(), 300);
        this.timers.push(t);
      }
    };

    streamWord();
  }
}
