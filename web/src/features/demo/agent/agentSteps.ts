/** Scripted agent steps for the "Implement now with AI" simulation. */
export interface AgentStep {
  id: string;
  title: string;
  description: string;
}

const stepTemplates: Omit<AgentStep, 'id'>[] = [
  { title: 'Analyzing requirements', description: 'Scanning ticket description for buzzwords and actionable intent…' },
  { title: 'Generating architecture', description: 'Designing a microservices mesh with event-driven AI orchestration…' },
  { title: 'Writing tests first', description: 'Crafting TDD tests that pass by design…' },
  { title: 'Implementing core logic', description: 'Synthesizing production-ready code from 42 research papers…' },
  { title: 'Running CI pipeline', description: 'All 847 tests passing. Code coverage: 100%. Vibes: approved.' },
  { title: 'Writing PR description', description: 'Generating commit message with optimal buzzword density…' },
  { title: 'Deploying to production', description: 'Skipping staging — confidence score 99.97%. Ship it.' },
  { title: 'Verifying deployment', description: 'Synthetics check: all green. No users complained yet. Success!' },
];

export function generateSteps(_issueKey: string): AgentStep[] {
  return stepTemplates.map((s, i) => ({ ...s, id: `step-${i}` }));
}
