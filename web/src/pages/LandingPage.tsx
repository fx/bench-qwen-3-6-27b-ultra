import { ThemeScope } from '@/components/ThemeScope';
import { Nav } from '@/features/landing/sections/Nav';
import { Hero } from '@/features/landing/sections/Hero';
import { FeatureBento } from '@/features/landing/sections/FeatureBento';
import { Stats } from '@/features/landing/sections/Stats';
import { Testimonials } from '@/features/landing/sections/Testimonials';
import { Pricing } from '@/features/landing/sections/Pricing';
import { FAQ } from '@/features/landing/sections/FAQ';
import { BigCta } from '@/features/landing/sections/BigCta';
import { Footer } from '@/features/landing/sections/Footer';

export function LandingPage() {
  return (
    <ThemeScope theme="marketing">
      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <div id="features">
            <FeatureBento />
          </div>
          <Stats />
          <Testimonials />
          <div id="pricing">
            <Pricing />
          </div>
          <div id="faq">
            <FAQ />
          </div>
          <BigCta />
        </main>
        <Footer />
      </div>
    </ThemeScope>
  );
}
