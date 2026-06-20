import { useDemoStore } from '../store/store';

export function DetailsPanel({ issueKey }: { issueKey: string }) {
  const issue = useDemoStore((s) => s.issues.find((i) => i.key === issueKey));

  if (!issue) return null;

  return (
    <div className="w-64 shrink-0 p-4 border-l border-[#DFE1E6] space-y-4 overflow-y-auto">
      <h3 className="text-xs font-semibold text-[#6B778C] uppercase tracking-wide">Details</h3>

      <Field label="Assignee" value={issue.assignee?.name ?? 'Unassigned'} icon={issue.assignee?.avatar} />
      <Field label="Reporter" value={issue.reporter.name} icon={issue.reporter.avatar} />
      <Field label="Priority" value={issue.priority} />
      {issue.storyPoints != null && (
        <Field label="Story Points" value={String(issue.storyPoints)} />
      )}
      <Field label="Labels" value={issue.labels.join(', ')} />
      <Field label="Type" value={issue.type} />
      <Field label="Key" value={issue.key} monospace />
    </div>
  );
}

function Field({
  label,
  value,
  icon,
  monospace,
}: {
  label: string;
  value: string;
  icon?: string;
  monospace?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-xs font-medium text-[#6B778C] w-24 shrink-0">{label}</span>
      <span className={`text-sm text-[#172B4D] ${monospace ? 'font-mono' : ''}`}>
        {icon && <span className="mr-1">{icon}</span>}
        {value}
      </span>
    </div>
  );
}
