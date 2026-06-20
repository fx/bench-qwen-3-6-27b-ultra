import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-lg">
          🤖 Slop Simulator
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
          <Button size="sm" onClick={() => navigate('/demo')}>
            Try Demo ✨
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-3">
          <a href="#features" className="block text-sm" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block text-sm" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#faq" className="block text-sm" onClick={() => setMobileOpen(false)}>FAQ</a>
          <Button size="sm" onClick={() => { navigate('/demo'); setMobileOpen(false); }}>
            Try Demo ✨
          </Button>
        </div>
      )}
    </nav>
  );
}
