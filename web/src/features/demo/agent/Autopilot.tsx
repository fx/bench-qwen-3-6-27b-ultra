import { useEffect } from 'react';
import { useDemoStore } from '../store/store';
import { type Status } from '../data/types';

/**
 * Agentic Autopilot — autonomously moves issues toward "done" over time.
 * Uses setInterval; when toggled off, clears the timer.
 */
export function Autopilot() {
  const autopilotEnabled = useDemoStore((s) => s.autopilotEnabled);
  const toggleAutopilot = useDemoStore((s) => s.toggleAutopilot);
  const moveIssue = useDemoStore((s) => s.moveIssue);

  useEffect(() => {
    if (!autopilotEnabled) return;

    const progress: Record<Status, Status | null> = {
      'todo': 'in-progress',
      'in-progress': 'in-review',
      'in-review': 'done',
      'done': null,
    };

    const timer = setInterval(() => {
      const current = useDemoStore.getState().issues;
      const movable = current.filter((i) => i.status !== 'done');
      if (!movable.length) return;
      const pick = movable[Math.floor(Math.random() * movable.length)]!;
      const next = progress[pick.status];
      if (next) moveIssue(pick.key, next);
    }, 3000);

    return () => clearInterval(timer);
  }, [autopilotEnabled, moveIssue]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-[#6B778C]">Agentic Autopilot</span>
      <button
        onClick={toggleAutopilot}
        className={`relative w-10 h-5 rounded-full transition-colors ${autopilotEnabled ? 'bg-green-500' : 'bg-gray-300'}`}
        data-testid="autopilot-toggle"
        aria-label="Toggle agentic autopilot"
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${autopilotEnabled ? 'translate-x-5' : 'translate-x-0.5'}`}
        />
      </button>
      {autopilotEnabled && <span className="text-xs text-green-600 animate-pulse">● Shipping…</span>}
    </div>
  );
}
