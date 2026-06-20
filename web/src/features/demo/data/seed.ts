import { type Issue, type User } from './types';

export const users: User[] = [
  { id: 'u1', name: 'Alex Chen', avatar: '🧑‍💻' },
  { id: 'u2', name: 'Priya Sharma', avatar: '👩‍💻' },
  { id: 'u3', name: 'Rovo Ultra', avatar: '🤖', isAgent: true },
  { id: 'u4', name: 'Mike Johnson', avatar: '👨‍💻' },
];

export const seedIssues: Issue[] = [
  {
    id: 'i1', key: 'SLOP-101', summary: 'Implement AI-powered standup summaries',
    description: 'Our AI agent should generate standup updates based on commit history, PR activity, and the vibes in Slack.',
    type: 'story', priority: 'high', status: 'todo',
    assignee: users[2]!, reporter: users[0]!, storyPoints: 8, labels: ['ai', 'agentic'],
  },
  {
    id: 'i2', key: 'SLOP-102', summary: 'Auto-generate OKRs from LinkedIn posts',
    description: 'Scrape the engineering leadership\'s LinkedIn posts and use LLM magic to extract "goals" for the quarter.',
    type: 'story', priority: 'medium', status: 'todo',
    assignee: users[1]!, reporter: users[0]!, storyPoints: 5, labels: ['ai', 'productivity'],
  },
  {
    id: 'i3', key: 'SLOP-103', summary: 'Replace code reviews with AI vibes check',
    description: 'Human code reviews are slow. Replace them with an AI agent that reviews code based on aesthetic appeal and buzzword density.',
    type: 'story', priority: 'critical', status: 'in-progress',
    assignee: users[2]!, reporter: users[3]!, storyPoints: 13, labels: ['ai', 'devex'],
  },
  {
    id: 'i4', key: 'SLOP-104', summary: 'Fix: AI assigned tickets to fired employees',
    description: 'The AI agent doesn\'t know who left the company. It keeps assigning tickets to people who were let go last quarter.',
    type: 'bug', priority: 'critical', status: 'in-progress',
    assignee: users[0]!, reporter: users[1]!, storyPoints: 3, labels: ['bug', 'ai'],
  },
  {
    id: 'i5', key: 'SLOP-105', summary: 'Add "synergize" to auto-complete',
    description: 'The word "synergize" should appear in every auto-suggested commit message, PR title, and ticket summary.',
    type: 'task', priority: 'low', status: 'todo',
    reporter: users[3]!, storyPoints: 2, labels: ['buzzwords'],
  },
  {
    id: 'i6', key: 'SLOP-106', summary: 'Deploy to prod using AI intuition',
    description: 'Instead of CI/CD pipelines, let the AI agent decide when code is "vibes-approved" for production.',
    type: 'story', priority: 'high', status: 'in-review',
    assignee: users[2]!, reporter: users[0]!, storyPoints: 13, labels: ['ai', 'devops'],
  },
  {
    id: 'i7', key: 'SLOP-107', summary: 'Generate investor slides from Jira board',
    description: 'Auto-generate pitch deck slides by taking screenshots of the Jira board and adding arrows pointing up.',
    type: 'story', priority: 'medium', status: 'done',
    assignee: users[1]!, reporter: users[3]!, storyPoints: 5, labels: ['ai', 'sales'],
  },
  {
    id: 'i8', key: 'SLOP-108', summary: 'Fix: Autopilot shipped to wrong branch',
    description: 'Agentic Autopilot shipped 14 tickets to the staging branch instead of main. All tickets are now "Done" but nothing deployed.',
    type: 'bug', priority: 'high', status: 'todo',
    assignee: users[2]!, reporter: users[0]!, storyPoints: 5, labels: ['bug', 'autopilot'],
  },
  {
    id: 'i9', key: 'SLOP-109', summary: 'AI-generated error messages',
    description: 'Replace "500 Internal Server Error" with AI-generated messages like "Our agents are experiencing an existential crisis."',
    type: 'story', priority: 'low', status: 'done',
    assignee: users[0]!, reporter: users[2]!, storyPoints: 3, labels: ['ai', 'ux'],
  },
  {
    id: 'i10', key: 'SLOP-110', summary: 'Standup Bot v2 — now with feelings',
    description: 'The Standup Bot should now express emotions about the sprint. If velocity is low, it should sound "disappointed but understanding."',
    type: 'story', priority: 'medium', status: 'todo',
    assignee: users[2]!, reporter: users[1]!, storyPoints: 8, labels: ['ai', 'agent'],
  },
  {
    id: 'i11', key: 'SLOP-111', summary: 'Velocity inflation engine',
    description: 'Build an AI model that predicts what velocity number will make the most positive impression on stakeholders.',
    type: 'story', priority: 'medium', status: 'in-review',
    assignee: users[2]!, reporter: users[3]!, storyPoints: 8, labels: ['ai', 'metrics'],
  },
  {
    id: 'i12', key: 'SLOP-112', summary: 'Blame Assigner agent',
    description: 'When a production incident occurs, the Blame Assigner agent should identify the most politically safe person to blame.',
    type: 'story', priority: 'high', status: 'todo',
    assignee: users[2]!, reporter: users[0]!, storyPoints: 13, labels: ['ai', 'agent'],
  },
];
