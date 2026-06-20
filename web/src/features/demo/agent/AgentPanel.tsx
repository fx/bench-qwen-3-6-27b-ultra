import { useEffect, useCallback } from 'react';
import { useDemoStore, type AgentRunState } from '../store/store';
import { AgentEngine } from './agentEngine';

export function AgentPanel() {
  const agentRun = useDemoStore((s) => s.agentRun);
  const startAgent = useDemoStore((s) => s.startAgent);
  const cancelAgent = useDemoStore((s) => s.cancelAgent);

  const onStateChange = useCallback((state: AgentRunState) => {
    useDemoStore.setState({ agentRun: { ...useDemoStore.getState().agentRun!, ...state } });
  }, []);

  useEffect(() => {
    if (!agentRun || agentRun.status !== 'idle' || !agentRun.issueKey) return;
    const engine = new AgentEngine(onStateChange);
    startAgent(agentRun.issueKey, engine);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!agentRun) return null;

  const { steps, currentStepIndex, streamingText, status } = agentRun;

  return (
    <div className="bg-[#0B0C0E] text-green-400 rounded-lg p-4 font-mono text-xs h-full overflow-y-auto" data-testid="agent-panel">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Rovo Ultra — Agent Terminal
        </span>
        {status === 'running' && (
          <button
            onClick={() => cancelAgent()}
            className="text-red-400 hover:text-red-300 text-xs border border-red-800 rounded px-2 py-0.5"
            data-testid="cancel-agent"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => {
          const isDone = i < currentStepIndex;
          const isCurrent = i === currentStepIndex;
          return (
            <div key={step.id} className="flex gap-2">
              <span className="shrink-0">
                {isDone ? '✅' : isCurrent ? '🔵' : '⬜'}
              </span>
              <div>
                <span className={isDone ? 'text-green-300' : isCurrent ? 'text-yellow-300' : 'text-gray-600'}>
                  {step.title}
                </span>
                {isCurrent && streamingText && (
                  <div className="text-green-400 mt-1">
                    {streamingText}
                    <span className="animate-pulse">▊</span>
                  </div>
                )}
                {isDone && <div className="text-green-500/60 mt-1">{step.description}</div>}
              </div>
            </div>
          );
        })}
      </div>

      {status === 'complete' && (
        <div className="mt-4 text-green-300 font-bold border-t border-green-800 pt-3" data-testid="agent-complete">
          ✅ Issue shipped to production! All systems operational.
        </div>
      )}

      {status === 'cancelled' && (
        <div className="mt-4 text-red-400 font-bold border-t border-red-800 pt-3" data-testid="agent-cancelled">
          ❌ Agent run cancelled by user.
        </div>
      )}
    </div>
  );
}
