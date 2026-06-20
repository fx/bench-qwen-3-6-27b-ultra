import { useMemo } from 'react';
import { useDemoStore } from '../store/store';
import { type Comment } from '../data/types';
import { formatRelative } from './timeUtils';

export function ActivityFeed({ issueId }: { issueId: string }) {
  const allComments = useDemoStore((s) => s.comments);
  const comments = useMemo(() =>
    [...allComments.filter((c) => c.issueId === issueId)].sort((a: Comment, b: Comment) => b.createdAt.getTime() - a.createdAt.getTime()),
    [allComments, issueId]
  );

  if (!comments.length) {
    return (
      <div className="text-sm text-[#6B778C] text-center py-8" data-testid="empty-activity">
        No activity yet. Add a comment below.
      </div>
    );
  }

  return (
    <div className="space-y-3" data-testid="activity-feed">
      {comments.map((c: Comment) => (
        <div key={c.id} className="flex gap-3" data-testid="activity-item">
          <span className="w-8 h-8 rounded-full bg-[#DEEBFF] flex items-center justify-center shrink-0 text-sm">
            {c.author.avatar}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-[#172B4D]">{c.author.name}</span>
              <span className="text-xs text-[#6B778C]">{formatRelative(c.createdAt)}</span>
            </div>
            <p className="text-sm text-[#172B4D] whitespace-pre-wrap">{c.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
