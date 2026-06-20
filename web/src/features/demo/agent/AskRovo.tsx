import { useState } from 'react';

const answers: string[] = [
  'Based on my analysis of 14,847 similar queries across 23 industries, the answer is definitely "use AI." Specifically, I recommend an agentic, paradigm-shifting, cloud-native solution that synergizes your OKRs with your GitHub activity. [Source: Rovo Knowledge Base, vol. ∞]',
  'Great question! After consulting with 37 microservices and running 847 A/B tests in my neural mesh, I can confirm that the velocity will be what stakeholders expect. Confidence: 99.97%. [Citation: vibes]',
  'According to my proprietary algorithm (patent pending in 4 dimensions), the optimal approach is to assign this to Rovo Ultra and schedule a follow-up standup. Historical success rate: unmeasurable but promising.',
  'I\'ve analyzed your Jira board, Slack messages, and coffee consumption patterns. The data clearly indicates you need more agents. Not fewer — more. Specifically, a Blame Assigner and a Velocity Prophet. [Peer-reviewed by another AI]',
  'Fascinating inquiry! My cross-modal reasoning engine has determined that your sprint velocity correlates strongly with the number of arrows pointing up in your pitch deck. I recommend both. [DOI: 10.42/fictional]',
];

export function AskRovo() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsStreaming(true);
    setResponse(null);

    // Simulate streaming response
    const picked = answers[Math.floor(Math.random() * answers.length)]!;
    let index = 0;
    const chunk = () => {
      index += 3;
      setResponse(picked.slice(0, index));
      if (index < picked.length) {
        setTimeout(chunk, 15);
      } else {
        setIsStreaming(false);
      }
    };
    setTimeout(chunk, 200);
  };

  return (
    <div className="border-t border-[#DFE1E6] p-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Rovo anything…"
          className="flex-1 rounded border border-[#DFE1E6] px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
          data-testid="ask-rovo-input"
        />
        <button
          type="submit"
          className="bg-[#FFC400] text-[#172B4D] text-sm font-medium rounded px-3 hover:bg-[#FFB700] flex items-center gap-1"
          data-testid="ask-rovo-submit"
        >
          🤖 Ask
        </button>
      </form>

      {response && (
        <div className="mt-3 bg-[#FFF7E6] rounded p-3 text-sm text-[#172B4D]" data-testid="ask-rovo-response">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-xs font-bold text-[#FF8B00]">🤖 Rovo Ultra</span>
            {isStreaming && <span className="animate-pulse text-xs text-[#6B778C]">thinking…</span>}
          </div>
          <p className="whitespace-pre-wrap">{response}</p>
          {isStreaming && <span className="animate-pulse inline">▊</span>}
        </div>
      )}
    </div>
  );
}
