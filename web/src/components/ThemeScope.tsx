import { type ReactNode } from 'react';

export interface ThemeScopeProps {
  theme: 'marketing' | 'jira';
  children: ReactNode;
}

export function ThemeScope({ theme, children }: ThemeScopeProps) {
  return <div data-theme={theme}>{children}</div>;
}
