import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useDemoStore } from './store';
import { AgentEngine } from '../agent/agentEngine';

describe('store', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('resets state', () => {
    useDemoStore.getState().addComment('i1', 'test');
    useDemoStore.getState().reset();
    expect(useDemoStore.getState().comments.length).toBe(0);
    expect(useDemoStore.getState().selectedIssueKey).toBeNull();
  });

  it('opens and closes issues', () => {
    useDemoStore.getState().openIssue('SLOP-101');
    expect(useDemoStore.getState().selectedIssueKey).toBe('SLOP-101');
    useDemoStore.getState().closeIssue();
    expect(useDemoStore.getState().selectedIssueKey).toBeNull();
  });

  it('moves issues', () => {
    useDemoStore.getState().moveIssue('SLOP-101', 'done');
    const issue = useDemoStore.getState().issues.find((i) => i.key === 'SLOP-101');
    expect(issue?.status).toBe('done');
  });

  it('sets issue status', () => {
    useDemoStore.getState().setIssueStatus('SLOP-101', 'in-progress');
    const issue = useDemoStore.getState().issues.find((i) => i.key === 'SLOP-101');
    expect(issue?.status).toBe('in-progress');
  });

  it('adds comments', () => {
    useDemoStore.getState().addComment('i1', 'Hello');
    const comments = useDemoStore.getState().comments;
    expect(comments.length).toBe(1);
    expect(comments[0]?.body).toBe('Hello');
    expect(comments[0]?.issueId).toBe('i1');
  });

  it('toggles sidebar', () => {
    expect(useDemoStore.getState().sidebarCollapsed).toBe(false);
    useDemoStore.getState().toggleSidebar();
    expect(useDemoStore.getState().sidebarCollapsed).toBe(true);
  });

  it('toggles autopilot', () => {
    expect(useDemoStore.getState().autopilotEnabled).toBe(false);
    useDemoStore.getState().toggleAutopilot();
    expect(useDemoStore.getState().autopilotEnabled).toBe(true);
  });

  it('completes agent run', () => {
    useDemoStore.getState().completeAgent('SLOP-101');
    const issue = useDemoStore.getState().issues.find((i) => i.key === 'SLOP-101');
    expect(issue?.status).toBe('done');
    expect(useDemoStore.getState().comments.length).toBe(1);
    expect(useDemoStore.getState().agentRun).toBeNull();
  });

  it('cancels agent', () => {
    useDemoStore.getState().cancelAgent();
    expect(useDemoStore.getState().agentRun).toBeNull();
  });

  it('startAgent sets agentRun state', () => {
    const mockEngine = {
      start: vi.fn(),
      cancel: vi.fn(),
    } as unknown as AgentEngine;
    useDemoStore.getState().startAgent('SLOP-101', mockEngine);
    expect(useDemoStore.getState().agentRun).toBeTruthy();
    expect(useDemoStore.getState().agentRun?.issueKey).toBe('SLOP-101');
  });
});
