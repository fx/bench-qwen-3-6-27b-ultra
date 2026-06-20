import { useState } from 'react';
import { useDemoStore } from '../store/store';

export function CommentComposer({ issueId }: { issueId: string }) {
  const [text, setText] = useState('');
  const addComment = useDemoStore((s) => s.addComment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComment(issueId, text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#DFE1E6] pt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment…"
        rows={3}
        className="w-full rounded border border-[#DFE1E6] p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
        data-testid="comment-input"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-3 py-1.5 bg-[#0052CC] text-white text-sm rounded hover:bg-[#0747A6] disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="comment-submit"
        >
          Comment
        </button>
      </div>
    </form>
  );
}
