import { Check } from 'lucide-react';

const PLANS = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Ad-supported viewing with standard definition.',
    features: [
      'Access to limited library',
      'Standard Definition (720p)',
      'Watch on 1 device at a time',
      'Ad-supported',
    ],
    buttonText: 'Current Plan',
    popular: false,
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    description: 'The ultimate cinematic experience without interruptions.',
    features: [
      'Access to full library & exclusives',
      '4K Ultra HD + HDR',
      'Watch on 4 devices simultaneously',
      'Ad-free experience',
      'Download for offline viewing',
      'Spatial Audio support',
    ],
    buttonText: 'Start 7-Day Free Trial',
    popular: true,
  },
  {
    name: 'Family',
    price: '$14.99',
    period: '/month',
    description: 'Share the magic with everyone in your household.',
    features: [
      'Everything in Premium',
      'Up to 6 individual profiles',
      'Watch on 6 devices simultaneously',
      'Kids mode with parental controls',
    ],
    buttonText: 'Choose Family',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Choose Your Experience
        </h1>
        <p className="text-xl text-text-secondary">
          Upgrade to Premium to unlock 4K HDR, offline downloads, and an ad-free cinematic journey. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PLANS.map((plan) => (
          <div 
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col h-full transition-transform duration-300 hover:-translate-y-2 ${
              plan.popular 
                ? 'bg-gradient-to-b from-brand/20 to-surface border-2 border-brand shadow-2xl shadow-brand/20' 
                : 'bg-surface border border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-display font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-text-secondary text-sm h-10">{plan.description}</p>
            </div>
            
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-display font-bold text-white">{plan.price}</span>
              {plan.period && <span className="text-text-secondary">{plan.period}</span>}
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-white/80">
                  <Check className={`w-5 h-5 shrink-0 ${plan.popular ? 'text-brand' : 'text-text-secondary'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`w-full py-4 rounded-full font-semibold transition-colors ${
                plan.popular 
                  ? 'bg-brand hover:bg-brand-hover text-white' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-32 max-w-3xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.' },
            { q: 'What devices are supported?', a: 'CineStream is available on smart TVs, game consoles, streaming media players, mobile phones, and tablets.' },
            { q: 'How does the free trial work?', a: 'Try Premium free for 7 days. If you enjoy it, do nothing and your membership will automatically continue. You can cancel anytime before the trial ends to avoid being charged.' },
          ].map((faq, i) => (
            <div key={i} className="bg-surface p-6 rounded-xl border border-white/5">
              <h4 className="text-lg font-semibold text-white mb-2">{faq.q}</h4>
              <p className="text-text-secondary">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
