'use client';

import { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, magnet: 'email-list' }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail('');
        setTimeout(() => setIsSubmitted(false), 4000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-lime-400/10 to-lime-400/5 border border-lime-400/20 py-16 md:py-24 px-4 sm:px-6 lg:px-8 rounded-2xl my-12 md:my-20 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Content */}
        <div>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-lime-400/20 border border-lime-400/30 rounded-full">
            <Mail className="w-4 h-4 text-lime-400" />
            <span className="text-xs font-semibold text-lime-400">Join 500+ Clients</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated With Expert Tips
          </h2>
          <p className="text-zinc-300 text-lg mb-6">
            Get weekly fitness insights, nutrition tips, and exclusive client updates delivered to your inbox. Join our community and stay on track with your goals.
          </p>

          <ul className="space-y-3 mb-8">
            {[
              'Weekly workout programming tips',
              'Nutrition science simplified',
              'Exclusive client success stories',
              'Early access to programs',
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-zinc-300">
                <CheckCircle className="w-5 h-5 text-lime-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3.5 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Subscribing...' : <>
                  Get Free Tips <ArrowRight className="w-4 h-4" />
                </>}
              </button>
              <p className="text-xs text-zinc-500 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <div className="bg-lime-400/10 border border-lime-400/30 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-lime-400 mx-auto mb-3" />
              <p className="font-semibold text-white mb-2">
                Welcome to the community!
              </p>
              <p className="text-sm text-zinc-300">
                Check your email for your first exclusive tip.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
