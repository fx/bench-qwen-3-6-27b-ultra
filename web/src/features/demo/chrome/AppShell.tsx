import { useState } from 'react';
import { ThemeScope } from '@/components/ThemeScope';
import { useDemoStore } from '../store/store';
import { KanbanBoard } from '../board/Board';
import { IssueDetail } from '../issue/IssueDetail';
import { Autopilot } from '../agent/Autopilot';
import { AskRovo } from '../agent/AskRovo';
import { RovoRoster } from '../agent/RovoRoster';

type View = 'board' | 'roster';

export function AppShell() {
  const sidebarCollapsed = useDemoStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useDemoStore((s) => s.toggleSidebar);
  const [view, setView] = useState<View>('board');

  return (
    <ThemeScope theme="jira">
      <div className="h-screen flex flex-col bg-background">
        {/* Top Nav */}
        <header className="h-12 bg-[#0052CC] text-white flex items-center px-4 gap-4 shrink-0">
          <button type="button" className="text-lg" aria-label="App menu">
            ☰
          </button>
          <span className="font-bold">SLOP</span>
          <nav className="flex gap-4 text-sm ml-4">
            <span className="cursor-pointer font-medium">Issues</span>
            <span className="cursor-pointer opacity-70 hover:opacity-100">Boards</span>
            <span className="cursor-pointer opacity-70 hover:opacity-100">Reports</span>
          </nav>
          <div className="flex-1" />
          <Autopilot />
          <button type="button" className="bg-white text-[#0052CC] px-3 py-1 rounded text-sm font-medium">
            Create
          </button>
          <span className="opacity-70">🔍</span>
          <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">AC</span>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside
            className={`bg-[#FAFBFC] border-r border-border shrink-0 transition-all ${sidebarCollapsed ? 'w-12' : 'w-56'}`}
          >
            <div className="p-3">
              <button type="button" onClick={toggleSidebar} className="text-sm text-muted-foreground hover:text-foreground">
                {sidebarCollapsed ? '→' : '☰ Collapse'}
              </button>
            </div>
            {!sidebarCollapsed && (
              <div className="px-3 space-y-1 text-sm">
                <div className="font-medium px-2 py-1 bg-accent rounded">Project: SLOP</div>
                <div
                  className={`px-2 py-1.5 rounded cursor-pointer font-medium ${view === 'board' ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                  onClick={() => setView('board')}
                >
                  Board
                </div>
                <div className="px-2 py-1.5 rounded cursor-pointer hover:bg-accent">Backlog</div>
                <div
                  className={`px-2 py-1.5 rounded cursor-pointer hover:bg-accent ${view === 'roster' ? 'bg-primary/10 text-primary' : ''}`}
                  onClick={() => setView('roster')}
                  data-testid="roster-link"
                >
                  Rovo Agents
                </div>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-[#FAFBFC] flex flex-col">
            {view === 'board' ? (
              <div className="flex-1 p-4">
                <KanbanBoard />
              </div>
            ) : (
              <RovoRoster />
            )}
            <AskRovo />
          </main>
        </div>

        {/* Issue Detail Modal */}
        <IssueDetail />
      </div>
    </ThemeScope>
  );
}
