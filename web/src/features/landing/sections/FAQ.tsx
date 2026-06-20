import { useState } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { faq } from '../content';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Frequently Asked Questions
          </h2>
        </FadeUp>

        <div className="space-y-4">
          {faq.map((item, i) => (
            <FadeUp key={item.question} delay={0.05 * i}>
              <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-medium"
                >
                  <span>{item.question}</span>
                  <span className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 text-muted-foreground">{item.answer}</div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
