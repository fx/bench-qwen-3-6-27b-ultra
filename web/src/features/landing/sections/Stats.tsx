import { FadeUp } from '@/components/motion/FadeUp';
import { CountUp } from '@/components/motion/CountUp';
import { stats } from '../content';

export function Stats() {
  return (
    <section className="py-20 px-4 border-y border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <FadeUp key={stat.label} delay={0.1 * i}>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
