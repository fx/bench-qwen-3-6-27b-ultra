import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AgentEngine } from './agentEngine';
import { generateSteps } from './agentSteps';

describe('agentSteps', () => {
  it('generates steps with correct length', () => {
    const steps = generateSteps('SLOP-101');
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.id).toBeTruthy();
    expect(steps[0]?.title).toBeTruthy();
  });
});

describe('AgentEngine', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts and reports running state', () => {
    const cb = vi.fn();
    const engine = new AgentEngine(cb);
    engine.start('SLOP-101');
    expect(cb).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'running', issueKey: 'SLOP-101' })
    );
  });

  it('streams words incrementally', () => {
    const cb = vi.fn();
    const engine = new AgentEngine(cb);
    engine.start('SLOP-101');
    cb.mockClear();
    vi.advanceTimersByTime(80);
    expect(cb).toHaveBeenCalled();
  });

  it('cancels running engine', () => {
    const cb = vi.fn();
    const engine = new AgentEngine(cb);
    engine.start('SLOP-101');
    engine.cancel();
    expect(cb).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'cancelled' })
    );
  });

  it('runs to completion with all timers advanced', () => {
    const cb = vi.fn();
    const engine = new AgentEngine(cb);
    engine.start('SLOP-101');
    // Advance enough for all steps to complete
    vi.advanceTimersByTime(100000);
    expect(cb).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'complete' })
    );
  });
});
