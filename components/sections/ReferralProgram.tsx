'use client';

import { useState } from 'react';
import { Copy, Check, Gift, Users, Zap, Share2 } from 'lucide-react';

export default function ReferralProgram() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'KAUSTUBH500';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralBenefits = [
    {
      icon: Gift,
      title: 'Earn Rewards',
      description: '₹500 credit for every friend who joins',
    },
    {
      icon: Users,
      title: 'Unlimited Referrals',
      description: 'No limit to how many friends you can refer',
    },
    {
      icon: Zap,
      title: 'Instant Credits',
      description: 'Rewards credited immediately after signup',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description: 'Simple link to share via WhatsApp, email, or socials',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-zinc-900 to-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-lime-400">
            Referral Program
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4">
            Share the Fitness Love, Earn Rewards
          </h2>
          <p className="text-zinc-300 text-lg">
            Know someone who needs transformation? Refer them and earn ₹500 in credits. Help your friends achieve their goals while you benefit too.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* How It Works */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">How It Works</h3>

            {[
              {
                step: '1',
                title: 'Share Your Code',
                desc: 'Share your unique referral code with friends',
              },
              {
                step: '2',
                title: 'They Sign Up',
                desc: 'Your friend completes intake form using your code',
              },
              {
                step: '3',
                title: 'Booking Confirmed',
                desc: 'Once they book their session, you earn credits',
              },
              {
                step: '4',
                title: 'Enjoy Benefits',
                desc: 'Use your credits for your next program',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-lime-400 text-zinc-950 flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.title}</h4>
                  <p className="text-sm text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Referral Code Box */}
          <div className="bg-gradient-to-br from-lime-400/20 to-lime-400/5 border border-lime-400/30 rounded-2xl p-8 text-center">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white mb-2">Your Referral Code</h3>
              <p className="text-sm text-zinc-400 mb-6">
                Share this code with your friends to get them ₹200 off their first program
              </p>
            </div>

            <div className="bg-zinc-900 border border-lime-400/30 rounded-xl p-6 mb-6">
              <p className="text-4xl font-black text-lime-400 tracking-widest mb-4 font-mono">
                {referralCode}
              </p>
              <button
                onClick={handleCopy}
                className="w-full px-4 py-3 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-zinc-300">
                <strong>Your Earnings:</strong>
              </p>
              <p className="text-2xl font-bold text-lime-400">₹2,500 in credits</p>
              <p className="text-xs text-zinc-500">From 5 active referrals</p>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {referralBenefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-center hover:border-lime-400/30 transition-all"
              >
                <Icon className="w-8 h-8 text-lime-400 mx-auto mb-4" />
                <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
                <p className="text-sm text-zinc-400">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Terms */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="font-bold text-white mb-3">Program Terms</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• Both referrer and referred get ₹500 credit (₹200 off for friend)</li>
            <li>• Credits valid for all programs and packages</li>
            <li>• No limit to number of referrals</li>
            <li>• Credits must be used within 6 months of earning</li>
            <li>• Cannot be combined with other discounts</li>
            <li>• Fraudulent referrals will be cancelled</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://wa.me/919876543210?text=I%20want%20to%20refer%20my%20friend%20for%20Kaustubh%27s%20coaching%20program!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all"
          >
            <Share2 className="w-4 h-4" />
            Share Referral Code on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
