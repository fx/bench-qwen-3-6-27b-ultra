import { render, screen, fireEvent, act } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useDemoStore } from '../store/store';
import { AgentPanel } from './AgentPanel';
import { AskRovo } from './AskRovo';
import { Autopilot } from './Autopilot';
import { RovoRoster } from './RovoRoster';

function wrap(ui: JSX.Element) {
  return render(<HashRouter>{ui}</HashRouter>);
}

describe('AgentPanel', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('returns null when no agent run', () => {
    const { container } = wrap(<AgentPanel />);
    expect(container.firstChild).toBeNull();
  });

  it('renders agent panel when running', () => {
    useDemoStore.setState({
      agentRun: {
        issueKey: 'SLOP-101',
        steps: [],
        currentStepIndex: 0,
        streamingText: 'Working…',
        status: 'running',
      },
    });
    wrap(<AgentPanel />);
    expect(screen.getByTestId('agent-panel')).toBeTruthy();
    expect(screen.getByTestId('cancel-agent')).toBeTruthy();
  });

  it('shows complete state', () => {
    useDemoStore.setState({
      agentRun: {
        issueKey: 'SLOP-101',
        steps: [{ id: 's0', title: 'Step 1', description: 'Done' }],
        currentStepIndex: 1,
        streamingText: '',
        status: 'complete',
      },
    });
    wrap(<AgentPanel />);
    expect(screen.getByTestId('agent-complete')).toBeTruthy();
  });

  it('shows cancelled state', () => {
    useDemoStore.setState({
      agentRun: {
        issueKey: 'SLOP-101',
        steps: [],
        currentStepIndex: 0,
        streamingText: '',
        status: 'cancelled',
      },
    });
    wrap(<AgentPanel />);
    expect(screen.getByTestId('agent-cancelled')).toBeTruthy();
  });
});

describe('AskRovo', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders input and submit', () => {
    wrap(<AskRovo />);
    expect(screen.getByTestId('ask-rovo-input')).toBeTruthy();
    expect(screen.getByTestId('ask-rovo-submit')).toBeTruthy();
  });

  it('shows response on submit', () => {
    wrap(<AskRovo />);
    const input = screen.getByTestId('ask-rovo-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'What is the meaning of life?' } });
    act(() => {
      fireEvent.click(screen.getByTestId('ask-rovo-submit'));
    });
    // Advance timers for the streaming response
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByTestId('ask-rovo-response')).toBeTruthy();
  });
});

describe('Autopilot', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('renders toggle', () => {
    wrap(<Autopilot />);
    expect(screen.getByTestId('autopilot-toggle')).toBeTruthy();
  });

  it('toggles autopilot on click', () => {
    wrap(<Autopilot />);
    const toggle = screen.getByTestId('autopilot-toggle');
    expect(useDemoStore.getState().autopilotEnabled).toBe(false);
    fireEvent.click(toggle);
    expect(useDemoStore.getState().autopilotEnabled).toBe(true);
  });
});

describe('RovoRoster', () => {
  it('renders agent cards', () => {
    wrap(<RovoRoster />);
    const cards = screen.getAllByTestId('agent-card');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders hire buttons', () => {
    wrap(<RovoRoster />);
    const buttons = screen.getAllByTestId('hire-agent');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
