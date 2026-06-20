export type IssueType = 'story' | 'bug' | 'task' | 'epic';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface User {
  id: string;
  name: string;
  avatar: string;
  isAgent?: boolean;
}

export interface Issue {
  id: string;
  key: string;
  summary: string;
  description: string;
  type: IssueType;
  priority: Priority;
  status: Status;
  assignee?: User;
  reporter: User;
  storyPoints?: number;
  labels: string[];
}

export interface Comment {
  id: string;
  issueId: string;
  author: User;
  body: string;
  createdAt: Date;
}
