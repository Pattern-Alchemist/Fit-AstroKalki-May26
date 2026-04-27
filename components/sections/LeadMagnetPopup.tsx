'use client';

import { useState, useEffect } from 'react';
import { X, Download, CheckCircle } from 'lucide-react';

export default function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Show popup after 3 seconds of page load
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Call API to save email and send magnet
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          magnet: 'fat-loss-guide',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset after 3 seconds
        setTimeout(() => {
          setEmail('');
          setIsSubmitted(false);
          setIsOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 hover:bg-zinc-800 rounded-lg transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-zinc-400 hover:text-white" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="w-12 h-12 bg-lime-400/20 rounded-lg flex items-center justify-center mb-3">
                  <Download className="w-6 h-6 text-lime-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Get the Complete Fat Loss Guide
                </h2>
                <p className="text-sm text-zinc-400">
                  Free 7-day mini-course to kickstart your transformation journey
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-2 mb-6">
                {[
                  'Debunk 7 common fat loss myths',
                  'Discover the optimal meal timing',
                  'Learn the 3-pillar nutrition strategy',
                  'Daily email templates for success',
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  {isLoading ? 'Sending...' : 'Get Your Free Guide'}
                </button>
              </form>

              <p className="text-xs text-zinc-500 text-center mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-lime-400/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-lime-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Check Your Email!</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Your 7-day fat loss guide is on the way. Check your inbox for the first lesson.
            </p>
            <p className="text-xs text-zinc-500">
              (Closing in 3 seconds...)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
