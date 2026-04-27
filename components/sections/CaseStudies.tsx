'use client';

import { ArrowRight, TrendingDown, Zap, Target } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  id: string;
  name: string;
  goal: string;
  duration: string;
  beforeWeight: number;
  afterWeight: number;
  weightLost: number;
  keyMetrics: Array<{ label: string; value: string }>;
  testimonial: string;
  mainChallenge: string;
  solution: string;
  results: string[];
  image: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 'raj-kumar',
    name: 'Raj Kumar',
    goal: 'Fat Loss & Energy',
    duration: '15 weeks',
    beforeWeight: 95,
    afterWeight: 81,
    weightLost: 14,
    keyMetrics: [
      { label: 'Waist Reduction', value: '-8cm' },
      { label: 'Energy Levels', value: '+150%' },
      { label: 'Muscle Retained', value: '95%' },
    ],
    testimonial: 'Kaustubh helped me understand that fat loss is more about the right approach than extreme dieting. I feel healthier and more confident than ever.',
    mainChallenge: 'Struggling with yo-yo dieting and poor energy levels despite multiple attempts at losing weight',
    solution: 'Implemented a sustainable nutrition plan with metabolic tracking and progressive resistance training',
    results: [
      'Lost 14 kg of fat in 15 weeks',
      'Maintained all muscle mass',
      'Energy levels increased significantly',
      'Developed sustainable eating habits',
      'Completely transformed mindset about fitness',
    ],
    image: '/images/case1.jpg',
  },
  {
    id: 'priya-singh',
    name: 'Priya Singh',
    goal: 'Strength & Confidence',
    duration: '12 weeks',
    beforeWeight: 68,
    afterWeight: 66,
    weightLost: 2,
    keyMetrics: [
      { label: 'Strength Gain', value: '+40%' },
      { label: 'Body Recomposition', value: '+3kg muscle' },
      { label: 'Confidence Boost', value: 'Remarkable' },
    ],
    testimonial: 'I never believed I could be strong. Kaustubh showed me that I had no limits. This program changed my life completely.',
    mainChallenge: 'Wanted to build strength but had no gym experience and lacked confidence in her abilities',
    solution: 'Personalized strength coaching with technique mastery and progressive loading with form-focused training',
    results: [
      'Increased squats from 20kg to 70kg',
      'Developed lean muscle (3kg gain)',
      'Gained confidence in gym and life',
      'Set and achieved 3 new personal records',
      'Built a sustainable strength training habit',
    ],
    image: '/images/case2.jpg',
  },
  {
    id: 'amit-patel',
    name: 'Amit Patel',
    goal: 'Health & Longevity',
    duration: '20 weeks',
    beforeWeight: 110,
    afterWeight: 87,
    weightLost: 23,
    keyMetrics: [
      { label: 'Health Markers', value: 'All improved' },
      { label: 'Energy & Sleep', value: '+100%' },
      { label: 'Mobility', value: 'Completely restored' },
    ],
    testimonial: 'At 45, I thought I was too old to change. Kaustubh proved me wrong. I feel 25 again with better health than ever.',
    mainChallenge: 'Middle-aged with multiple health concerns, mobility issues, and had given up on fitness',
    solution: 'Holistic coaching addressing nutrition, progressive mobility work, and sustainable lifestyle changes',
    results: [
      'Lost 23 kg of fat safely over 5 months',
      'All health markers returned to normal',
      'Mobility completely restored',
      'Built consistent 4-day workout routine',
      'Inspired family to adopt healthy habits',
    ],
    image: '/images/case3.jpg',
  },
];

export default function CaseStudies() {
  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-lime-400">
            Client Success Stories
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4">
            Real Transformations. Real People. Real Results.
          </h2>
          <p className="text-zinc-300 text-lg">
            See how our clients achieved their fitness goals and transformed their lives with personalized coaching and sustainable strategies.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden hover:border-lime-400/30 transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
                {/* Image Placeholder */}
                <div className="md:col-span-1 bg-gradient-to-br from-lime-400/20 to-lime-400/5 h-64 md:h-auto flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-lime-400 mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-zinc-500">Image: {study.name}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-6 md:p-8 space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{study.name}</h3>
                        <p className="text-sm text-zinc-400 mt-1">{study.goal}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Duration</p>
                        <p className="text-lg font-bold text-lime-400">{study.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Weight Loss */}
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-lime-400" />
                        <span className="text-xs text-zinc-400">Weight Loss</span>
                      </div>
                      <p className="text-2xl font-bold text-white">
                        {study.weightLost}
                        <span className="text-sm text-zinc-400 ml-1">kg</span>
                      </p>
                    </div>

                    {/* Before/After */}
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <span className="text-xs text-zinc-400">Before → After</span>
                      <p className="text-sm font-bold text-white mt-2">
                        {study.beforeWeight}
                        <span className="text-zinc-500 mx-1">→</span>
                        <span className="text-lime-400">{study.afterWeight}</span>
                        <span className="text-zinc-400"> kg</span>
                      </p>
                    </div>

                    {/* Key Metric */}
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <span className="text-xs text-zinc-400">Body Recomp</span>
                      <p className="text-sm font-bold text-white mt-2">
                        {study.keyMetrics[1].value}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase mb-3">Key Achievements</p>
                    <div className="grid grid-cols-3 gap-3">
                      {study.keyMetrics.map((metric, i) => (
                        <div key={i} className="text-center p-2">
                          <p className="text-xs text-zinc-400">{metric.label}</p>
                          <p className="text-sm font-bold text-lime-400">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="border-l-2 border-lime-400 pl-4 py-2">
                    <p className="italic text-white text-base">
                      "{study.testimonial}"
                    </p>
                  </div>

                  {/* Results List */}
                  <div>
                    <p className="text-sm font-semibold text-lime-400 mb-3">What Changed</p>
                    <ul className="space-y-2">
                      {study.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <Zap className="w-4 h-4 text-lime-400 flex-shrink-0 mt-0.5" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/case-studies/${study.id}`}
                    className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 font-semibold text-sm mt-2"
                  >
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-lime-400/10 to-lime-400/5 border border-lime-400/20 rounded-xl p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            These results are possible for you too. With the right coaching, nutrition plan, and mindset, you can achieve remarkable transformations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-lime-400 text-zinc-950 font-bold rounded-lg hover:bg-lime-300 transition-all"
            >
              Book Free Consultation
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/intake"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-lime-400/30 text-lime-400 font-bold rounded-lg hover:border-lime-400 transition-all"
            >
              Start Intake Form
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
