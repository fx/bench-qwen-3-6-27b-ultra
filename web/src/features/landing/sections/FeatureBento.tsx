import { FadeUp } from '@/components/motion/FadeUp';
import { features } from '../content';

export function FeatureBento() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Agentic Features for Agentic Teams
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto text-lg">
            Every feature was designed by an AI, for an AI, about an AI. It&apos;s very meta.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <FadeUp key={feature.title} delay={0.1 * (i + 1)}>
              <div className="group p-8 rounded-2xl border border-border bg-card/50 backdrop-blur hover:border-primary/50 transition-colors h-full">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
