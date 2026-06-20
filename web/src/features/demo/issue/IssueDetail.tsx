import { useDemoStore } from '../store/store';
import { StatusDropdown } from './StatusDropdown';
import { ActivityFeed } from './ActivityFeed';
import { CommentComposer } from './CommentComposer';
import { DetailsPanel } from './DetailsPanel';
import { AgentPanel } from '../agent/AgentPanel';
import { AgentEngine } from '../agent/agentEngine';

export function IssueDetail() {
  const selectedKey = useDemoStore((s) => s.selectedIssueKey);
  const closeIssue = useDemoStore((s) => s.closeIssue);
  const issue = useDemoStore((s) => s.issues.find((i) => i.key === selectedKey));
  const agentRun = useDemoStore((s) => s.agentRun);
  const startAgent = useDemoStore((s) => s.startAgent);

  const isRunning = agentRun?.issueKey === selectedKey && agentRun.status === 'running';

  const handleImplement = () => {
    if (!issue || isRunning) return;
    const engine = new AgentEngine((state) => {
      useDemoStore.setState({ agentRun: { ...useDemoStore.getState().agentRun!, ...state } });
    });
    startAgent(issue.key, engine);
  };

  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" data-testid="issue-detail-overlay" onClick={closeIssue}>
      <div
        className="bg-white rounded-lg shadow-xl w-11/12 max-w-5xl h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        data-testid="issue-detail"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#DFE1E6]">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#5E6C84]">{issue.key}</span>
            <h2 className="text-lg font-semibold text-[#172B4D]">{issue.summary}</h2>
          </div>
          <div className="flex items-center gap-3">
            {!isRunning && issue.status !== 'done' && (
              <button
                onClick={handleImplement}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-3 py-1.5 rounded font-medium hover:opacity-90 flex items-center gap-1"
                data-testid="implement-now-detail"
              >
                ✨ Implement now with AI
              </button>
            )}
            <button
              onClick={closeIssue}
              className="text-[#6B778C] hover:text-[#172B4D] text-xl leading-none"
              data-testid="close-detail"
              aria-label="Close issue detail"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left column */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <StatusDropdown issueKey={issue.key} />
            </div>

            <div className="mb-6">
              <h3 className="text-xs font-semibold text-[#6B778C] uppercase tracking-wide mb-2">Description</h3>
              <p className="text-sm text-[#172B4D] whitespace-pre-wrap">{issue.description}</p>
            </div>

            <div className="border-t border-[#DFE1E6] pt-4">
              <h3 className="text-xs font-semibold text-[#6B778C] uppercase tracking-wide mb-3">Activity</h3>
              <ActivityFeed issueId={issue.id} />
            </div>

            <div className="mt-4">
              <CommentComposer issueId={issue.id} />
            </div>
          </div>

          {/* Right column — DetailsPanel or AgentPanel */}
          {isRunning ? (
            <div className="w-96 shrink-0 overflow-y-auto p-3">
              <AgentPanel />
            </div>
          ) : (
            <DetailsPanel issueKey={issue.key} />
          )}
        </div>
      </div>
    </div>
  );
}
