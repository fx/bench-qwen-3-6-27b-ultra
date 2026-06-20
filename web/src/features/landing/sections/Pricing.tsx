import { useState } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { Button } from '@/components/ui/button';
import { pricing } from '../content';

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
            Pricing That Scales With Your Slop
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-muted-foreground text-center mb-8">
            Start free. Scale to singularity.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className={!annual ? 'text-foreground' : 'text-muted-foreground'}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((a) => !a)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-input'}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform ${annual ? 'translate-x-6' : ''}`}
              />
            </button>
            <span className={annual ? 'text-foreground' : 'text-muted-foreground'}>
              Annual <span className="text-primary text-sm">(save 20%)</span>
            </span>
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((tier, i) => (
            <FadeUp key={tier.name} delay={0.1 * (i + 1)}>
              <div className={`p-8 rounded-2xl border ${tier.name === 'Pro Agentic' ? 'border-primary' : 'border-border'} bg-card/50 h-full flex flex-col`}>
                {tier.name === 'Pro Agentic' && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4 w-fit">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {annual && tier.price !== 'Custom' ? tier.annualPrice : tier.price}
                  </span>
                  {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Button variant={tier.name === 'Pro Agentic' ? 'default' : 'outline'} className="w-full">
                  Get Started
                </Button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
