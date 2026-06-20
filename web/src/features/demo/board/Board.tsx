import { useDemoStore, type AgentRunState } from '../store/store';
import { type Issue, type Status } from '../data/types';
import { AgentEngine } from '../agent/agentEngine';

const columns: { key: Status; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-200' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-blue-200' },
  { key: 'in-review', label: 'In Review', color: 'bg-yellow-200' },
  { key: 'done', label: 'Done', color: 'bg-green-200' },
];

// Shared engine callback — updates store state from engine events
function engineCallback(state: AgentRunState) {
  useDemoStore.setState({ agentRun: { ...useDemoStore.getState().agentRun!, ...state } });
}

export function KanbanBoard() {
  const issues = useDemoStore((s) => s.issues);

  return (
    <div className="flex gap-4 overflow-x-auto h-full pb-4">
      {columns.map((col) => (
        <Column key={col.key} status={col.key} label={col.label} color={col.color} issues={issues} />
      ))}
    </div>
  );
}

function Column({ status, label, color, issues }: { status: Status; label: string; color: string; issues: Issue[] }) {
  const columnIssues = issues.filter((i) => i.status === status);
  const moveIssue = useDemoStore((s) => s.moveIssue);
  const openIssue = useDemoStore((s) => s.openIssue);
  const startAgent = useDemoStore((s) => s.startAgent);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const key = e.dataTransfer.getData('text/plain');
    if (key) moveIssue(key, status);
  };

  return (
    <div
      className="w-72 shrink-0 rounded-lg bg-[#F4F5F7] p-3"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-sm font-medium text-[#172B4D]">{label}</span>
          <span className="text-xs text-[#6B778C]">{columnIssues.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        {columnIssues.map((issue) => (
          <Card
            key={issue.id}
            issue={issue}
            onClick={() => openIssue(issue.key)}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', issue.key)}
            onImplement={() => {
              if (status !== 'done') {
                const engine = new AgentEngine(engineCallback);
                startAgent(issue.key, engine);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ issue, onClick, onDragStart, onImplement }: {
  issue: { key: string; summary: string; type: string; priority: string; storyPoints?: number; assignee?: { avatar: string }; labels: string[] };
  onClick: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onImplement: () => void;
}) {
  const typeColor: Record<string, string> = {
    story: 'text-green-600',
    bug: 'text-red-600',
    task: 'text-blue-600',
    epic: 'text-purple-600',
  };

  const priorityIcon: Record<string, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🔵',
    low: '⚪',
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onClick={onClick}
      className="bg-white rounded border border-[#DFE1E6] p-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-1 mb-1">
        <span className={`text-xs font-bold uppercase ${typeColor[issue.type] ?? 'text-gray-500'}`}>
          {issue.type === 'story' ? '■' : issue.type === 'bug' ? '●' : '◆'} {issue.type}
        </span>
        <span className="text-xs text-[#5E6C84]">{issue.key}</span>
      </div>
      <p className="text-sm text-[#172B4D] mb-2">{issue.summary}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {issue.storyPoints && (
            <span className="text-xs border border-[#DFE1E6] rounded px-1">{issue.storyPoints}sp</span>
          )}
          {issue.labels.slice(0, 2).map((l) => (
            <span key={l} className="text-xs px-1.5 py-0.5 rounded bg-[#EAEEF7] text-[#42526E]">{l}</span>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs">{priorityIcon[issue.priority]}</span>
          {issue.assignee && (
            <span className="w-6 h-6 rounded-full bg-[#DEEBFF] flex items-center justify-center text-xs">
              {issue.assignee.avatar}
            </span>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onImplement(); }}
        className="mt-2 w-full text-xs text-[#0052CC] hover:underline flex items-center justify-center gap-1"
        data-testid="implement-now"
      >
        ✨ Implement now with AI
      </button>
    </div>
  );
}
