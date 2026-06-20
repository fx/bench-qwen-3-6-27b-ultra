import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function BigCta() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-4 text-center">
      <FadeUp>
        <div className="max-w-3xl mx-auto p-12 rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/10 to-transparent">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Go Full Agentic?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Experience the most autonomous project management tool ever built.
            Our AI agents ship tickets while you sleep.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={() => navigate('/demo')}>
            Try the Demo — It&apos;s Free ✨
          </Button>
        </div>
      </FadeUp>
    </section>
  );
}
