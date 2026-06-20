import { useDemoStore } from '../store/store';
import { type Status } from '../data/types';

const statuses: { key: Status; label: string; color: string }[] = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-400' },
  { key: 'in-progress', label: 'In Progress', color: 'bg-blue-500' },
  { key: 'in-review', label: 'In Review', color: 'bg-yellow-500' },
  { key: 'done', label: 'Done', color: 'bg-green-500' },
];

export function StatusDropdown({ issueKey }: { issueKey: string }) {
  const issue = useDemoStore((s) => s.issues.find((i) => i.key === issueKey));
  const setIssueStatus = useDemoStore((s) => s.setIssueStatus);

  if (!issue) return null;

  const current = statuses.find((s) => s.key === issue.status)!;

  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-[#6B778C]">Status</label>
      <select
        value={issue.status}
        onChange={(e) => setIssueStatus(issueKey, e.target.value as Status)}
        className="text-sm border border-[#DFE1E6] rounded px-2 py-1 bg-white cursor-pointer"
        data-testid="status-dropdown"
      >
        {statuses.map((s) => (
          <option key={s.key} value={s.key}>
            {s.label}
          </option>
        ))}
      </select>
      <span className={`w-2 h-2 rounded-full ${current.color}`} />
    </div>
  );
}
