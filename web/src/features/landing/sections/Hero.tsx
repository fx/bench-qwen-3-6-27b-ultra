import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/motion/FadeUp';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <FadeUp>
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm mb-6">
            Now with 10× more buzzwords
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            The World&apos;s First Fully Autonomous Slop Engine
          </h1>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate, ship, and monetize AI slop — with zero human intervention.
            Our agents don&apos;t just write code. They write code about writing code.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" onClick={() => navigate('/demo')}>
              Try the Demo ✨
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch the Keynote
            </Button>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          {/* Terminal mock */}
          <div className="mt-16 mx-auto max-w-2xl rounded-lg border border-border bg-card/50 backdrop-blur p-4 text-left font-mono text-sm">
            <div className="flex gap-2 mb-3">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-muted-foreground">
              <span className="text-primary">$</span> npx slop-simulator init --agents 42<br />
              <span className="text-green-400">✓ 42 agentic slopflows activated</span><br />
              <span className="text-green-400">✓ Hype Copilot online</span><br />
              <span className="text-green-400">✓ Human-out-of-the-Loop: ENABLED</span><br />
              <span className="text-primary">$</span> <span className="animate-pulse">▊</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
