interface Agent {
  name: string;
  avatar: string;
  role: string;
  description: string;
  speed: string;
  accuracy: string;
  buzzwords: string;
}

const agents: Agent[] = [
  {
    name: 'Rovo Ultra',
    avatar: '🤖',
    role: 'Full-Stack Agent',
    description: 'Writes code, reviews PRs, and generates standup updates. Has opinions on your naming conventions.',
    speed: '99.7%',
    accuracy: 'Debated',
    buzzwords: '∞',
  },
  {
    name: 'Standup Bot v3',
    avatar: '📋',
    role: 'Standup Agent',
    description: 'Generates daily standup updates based on git commits and Slack vibes. Now with emotions.',
    speed: '95%',
    accuracy: 'Plausible',
    buzzwords: '847/day',
  },
  {
    name: 'Blame Assigner',
    avatar: '🎯',
    role: 'Incident Agent',
    description: 'Identifies the most politically safe person to blame when production goes down.',
    speed: 'Instant',
    accuracy: 'Legally vetted',
    buzzwords: 'High',
  },
  {
    name: 'Pitch Deck Genie',
    avatar: '📊',
    role: 'Investor Relations Agent',
    description: 'Turns Jira boards into pitch decks. Arrows always point up. Revenue is "imminent."',
    speed: '42 slides/min',
    accuracy: 'Creative',
    buzzwords: 'Off the charts',
  },
  {
    name: 'Velocity Prophet',
    avatar: '🔮',
    role: 'Metrics Agent',
    description: 'Predicts the velocity number that will impress stakeholders the most. Never wrong. Never right.',
    speed: 'Oracle-speed',
    accuracy: 'Fictional',
    buzzwords: 'Prophetic',
  },
  {
    name: 'OKR Alchemist',
    avatar: '⚗️',
    role: 'Strategy Agent',
    description: 'Transforms LinkedIn posts into quarterly OKRs. Leads to gold (or at least amber).',
    speed: 'Quarterly',
    accuracy: 'Ambitious',
    buzzwords: 'Transformational',
  },
];

export function RovoRoster() {
  return (
    <div className="p-6 overflow-y-auto h-full">
      <h2 className="text-xl font-bold text-[#172B4D] mb-1">Rovo Agents Roster</h2>
      <p className="text-sm text-[#6B778C] mb-6">Hire autonomous AI agents to supercharge your workflow. Results not advised.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="bg-white rounded-lg border border-[#DFE1E6] p-4 hover:shadow-md transition-shadow"
            data-testid="agent-card"
          >
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{agent.avatar}</span>
              <div>
                <h3 className="font-semibold text-[#172B4D]">{agent.name}</h3>
                <span className="text-xs text-[#0052CC] font-medium">{agent.role}</span>
              </div>
            </div>
            <p className="text-sm text-[#5E6C84] mb-3">{agent.description}</p>
            <div className="grid grid-cols-3 gap-2 text-xs text-[#6B778C]">
              <div>
                <span className="block font-semibold">Speed</span>
                {agent.speed}
              </div>
              <div>
                <span className="block font-semibold">Accuracy</span>
                {agent.accuracy}
              </div>
              <div>
                <span className="block font-semibold">Buzzwords</span>
                {agent.buzzwords}
              </div>
            </div>
            <button className="mt-3 w-full bg-[#0052CC] text-white text-sm rounded px-3 py-1.5 hover:bg-[#0747A6]" data-testid="hire-agent">
              Hire Agent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
