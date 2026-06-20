export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface PricingTier {
  name: string;
  price: string;
  annualPrice: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const features: Feature[] = [
  {
    title: 'Agentic Slopflows',
    description: 'Our AI agents don\'t just generate slop — they orchestrate entire slopflows with multi-step agentic reasoning. It\'s like a pipeline, but the pipeline has feelings.',
    icon: '🤖',
  },
  {
    title: 'Hype Copilot',
    description: 'Real-time buzzword injection. Hype Copilot watches your output and replaces "good" with "groundbreaking, synergistic, and paradigm-shifting" before you can blink.',
    icon: '💡',
  },
  {
    title: 'Autonomous Monetization',
    description: 'Why wait for product-market fit when your AI can find monetization angles you didn\'t know existed? Upsells happen at the speed of inference.',
    icon: '💰',
  },
  {
    title: 'Human-out-of-the-Loop Mode',
    description: 'The ultimate in autonomous operations. Toggle Human-out-of-the-Loop and watch your slop generate, review, ship, and invoice — with zero human touchpoints. Zero accountability. Maximum velocity.',
    icon: '🚀',
  },
];

export const stats = [
  { value: 10, suffix: '×', label: 'More Slop Per Sprint' },
  { value: 0, suffix: '', label: 'Developers Required' },
  { value: 99.9, suffix: '%', label: 'Buzzword Density' },
  { value: 24, suffix: '/7', label: 'Autonomous Operation' },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'We replaced our entire engineering team with Slop Simulator. Our burn rate dropped 90% and our LinkedIn posts went up 400%.',
    author: 'Sarah K.',
    role: 'CTO at a YC Batch',
  },
  {
    quote: 'The AI agents on Slop Simulator write better pull request descriptions than my senior engineers. And they never ask for equity.',
    author: 'Mike R.',
    role: 'Founder, 3 Exits',
  },
  {
    quote: 'I showed Slop Simulator to my board and they thought it was our actual product. Best demo I\'ve ever given.',
    author: 'Priya N.',
    role: 'VP of AI at Fortune 500',
  },
];

export const pricing: PricingTier[] = [
  {
    name: 'Hobby Slop',
    price: '$0',
    annualPrice: '$0',
    description: 'For individuals who want to generate a little slop.',
    features: ['100 slop generations/mo', 'Basic buzzword pack', 'Community support (also AI)'],
  },
  {
    name: 'Pro Agentic',
    price: '$49',
    annualPrice: '$39',
    description: 'For teams serious about autonomous slop.',
    features: [
      'Unlimited generations',
      'Advanced agentic slopflows',
      'Hype Copilot included',
      'Priority AI support',
    ],
  },
  {
    name: 'Enterprise Singularity',
    price: 'Custom',
    annualPrice: 'Custom',
    description: 'For when your slop needs SLAs.',
    features: [
      'Everything in Pro',
      'Dedicated slop agents',
      'SOC 2 compliance (AI-generated)',
      'Custom training on your buzzwords',
    ],
  },
];

export const faq: FAQ[] = [
  {
    question: 'Is Slop Simulator actually a real product?',
    answer: 'Yes, but the "product" it simulates is entirely fictional. Slop Simulator is a parody — a loving roast of the AI startup industrial complex. No real slop was harmed in the making of this product.',
  },
  {
    question: 'Do I need an API key?',
    answer: 'No API keys, no sign-ups, no data collection. The entire demo runs in your browser. The "AI" is a deterministic simulation — scripted, funny, and 100% offline.',
  },
  {
    question: 'Can I use this at my company?',
    answer: 'Feel free to show it to anyone. It makes a great icebreaker at conferences, a funny addition to your portfolio, or a way to explain to your team why we need to be careful with AI hype.',
  },
  {
    question: 'Who made this?',
    answer: 'A team of one developer who was tired of seeing "AI-powered" on every SaaS landing page. Built with React, Go, and a healthy sense of irony.',
  },
];
