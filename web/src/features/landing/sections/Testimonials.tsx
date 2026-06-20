import { FadeUp } from '@/components/motion/FadeUp';
import { testimonials } from '../content';

export function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Loved by Leaders in AI Slop
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={t.author} delay={0.1 * i}>
              <div className="p-6 rounded-2xl border border-border bg-card/50 h-full flex flex-col">
                <p className="text-muted-foreground mb-4 flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-medium">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
