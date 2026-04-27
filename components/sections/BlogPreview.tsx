'use client';

import { ArrowRight, Calendar, User, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'fat-loss-without-muscle',
    title: 'How to Lose Fat Without Losing Muscle: The Complete Guide',
    excerpt: 'Learn the science-backed strategies to preserve lean muscle while cutting fat. Discover the exact macronutrient ratios and training approach that works.',
    category: 'Nutrition',
    author: 'Kaustubh',
    date: '2024-04-20',
    readTime: 8,
    image: '/images/blog1.jpg',
  },
  {
    id: 'best-exercises-desk-job',
    title: 'The 5 Best Exercises for People with Desk Jobs',
    excerpt: 'Counteract the effects of sitting all day with these targeted exercises. Improve posture, reduce back pain, and boost energy levels.',
    category: 'Exercise',
    author: 'Kaustubh',
    date: '2024-04-18',
    readTime: 6,
    image: '/images/blog2.jpg',
  },
  {
    id: 'hormone-balance-fitness',
    title: 'Hormone Balancing for Better Fitness Results',
    excerpt: 'Understanding your hormones is key to achieving sustainable results. Explore how cortisol, testosterone, and insulin affect your fitness journey.',
    category: 'Science',
    author: 'Kaustubh',
    date: '2024-04-15',
    readTime: 10,
    image: '/images/blog3.jpg',
  },
  {
    id: 'recovery-secrets',
    title: 'Sleep, Recovery, and Muscles: The Complete Recovery System',
    excerpt: 'Your muscles grow outside the gym. Master the art of recovery with sleep optimization, nutrition timing, and mobility work.',
    category: 'Recovery',
    author: 'Kaustubh',
    date: '2024-04-12',
    readTime: 7,
    image: '/images/blog4.jpg',
  },
  {
    id: 'myth-busting',
    title: '10 Fat Loss Myths That Are Holding You Back',
    excerpt: 'Discover the truth behind common fitness myths. From "spot reduction" to "cardio before weights", we debunk them all.',
    category: 'Mindset',
    author: 'Kaustubh',
    date: '2024-04-10',
    readTime: 9,
    image: '/images/blog5.jpg',
  },
  {
    id: 'nutrition-for-women',
    title: 'Female-Specific Nutrition for Optimal Fitness Results',
    excerpt: 'Training as a woman is different. Learn about hormonal cycles, nutrient needs, and training adjustments for maximum results.',
    category: 'Nutrition',
    author: 'Kaustubh',
    date: '2024-04-08',
    readTime: 11,
    image: '/images/blog6.jpg',
  },
];

export default function BlogPreview() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-zinc-950 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-lime-400">
            Fitness Intelligence
          </p>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-4">
            Expert Insights & Science-Backed Articles
          </h2>
          <p className="text-zinc-300 text-lg">
            Learn from years of coaching experience. Articles on nutrition, training, recovery, and fitness science to accelerate your progress.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
          />
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-lime-400/30 transition-all"
            >
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-lime-400/10 to-lime-400/5 overflow-hidden relative">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-zinc-600" />
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-lime-400/90 text-zinc-950 text-xs font-bold rounded">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-zinc-400 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <span>{post.readTime} min read</span>
                </div>

                <div className="flex items-center gap-2 text-lime-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400">No articles found. Try adjusting your search.</p>
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 border border-lime-400 text-lime-400 font-bold rounded-lg hover:bg-lime-400/10 transition-all"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
