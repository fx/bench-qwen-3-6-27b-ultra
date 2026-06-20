import { render, screen, fireEvent } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import { useDemoStore } from '../store/store';
import { StatusDropdown } from './StatusDropdown';
import { ActivityFeed } from './ActivityFeed';
import { CommentComposer } from './CommentComposer';
import { DetailsPanel } from './DetailsPanel';
import { formatRelative, setMockNow, resetMockNow } from './timeUtils';

function wrap(ui: React.ReactNode) {
  return render(<HashRouter>{ui}</HashRouter>);
}

describe('timeUtils', () => {
  beforeEach(() => {
    resetMockNow();
  });

  it('formats just now', () => {
    setMockNow(() => new Date(1000));
    expect(formatRelative(new Date(999))).toBe('just now');
  });

  it('formats minutes', () => {
    setMockNow(() => new Date(70000));
    expect(formatRelative(new Date(0))).toBe('1m ago');
  });

  it('formats hours', () => {
    setMockNow(() => new Date(7200000));
    expect(formatRelative(new Date(0))).toBe('2h ago');
  });

  it('formats days', () => {
    setMockNow(() => new Date(86400000));
    expect(formatRelative(new Date(0))).toBe('1d ago');
  });
});

describe('StatusDropdown', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('renders current status', () => {
    useDemoStore.getState().openIssue('SLOP-101');
    const { container } = wrap(<StatusDropdown issueKey="SLOP-101" />);
    const select = container.querySelector('select') as HTMLSelectElement;
    expect(select?.value).toBe('todo');
  });

  it('changes status on select', () => {
    useDemoStore.getState().openIssue('SLOP-101');
    const { container } = wrap(<StatusDropdown issueKey="SLOP-101" />);
    const select = container.querySelector('select') as HTMLSelectElement;
    fireEvent.change(select!, { target: { value: 'done' } });
    const issue = useDemoStore.getState().issues.find((i) => i.key === 'SLOP-101');
    expect(issue?.status).toBe('done');
  });
});

describe('ActivityFeed', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('shows empty state when no comments', () => {
    wrap(<ActivityFeed issueId="i1" />);
    expect(screen.getByTestId('empty-activity')).toBeTruthy();
  });

  it('shows comments', () => {
    useDemoStore.getState().addComment('i1', 'Hello world');
    setMockNow(() => new Date('2026-01-01T00:00:00Z'));
    wrap(<ActivityFeed issueId="i1" />);
    expect(screen.getByTestId('activity-feed')).toBeTruthy();
  });
});

describe('CommentComposer', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('adds a comment on submit', () => {
    wrap(<CommentComposer issueId="i1" />);
    const input = screen.getByTestId('comment-input') as HTMLTextAreaElement;
    const btn = screen.getByTestId('comment-submit');
    fireEvent.change(input, { target: { value: 'Test comment' } });
    fireEvent.click(btn);
    const comments = useDemoStore.getState().comments;
    expect(comments.length).toBe(1);
    expect(comments[0]?.body).toBe('Test comment');
  });

  it('does not add empty comment', () => {
    wrap(<CommentComposer issueId="i1" />);
    const btn = screen.getByTestId('comment-submit');
    expect(btn).toBeDisabled();
  });
});

describe('DetailsPanel', () => {
  beforeEach(() => {
    useDemoStore.getState().reset();
  });

  it('shows issue details', () => {
    wrap(<DetailsPanel issueKey="SLOP-101" />);
    expect(screen.getByText('SLOP-101')).toBeTruthy();
  });
});
