'use client';

import { useState } from 'react';
import {
  Play,
  Search,
  Filter,
  Star,
  Clock,
  BarChart3,
  ChevronDown,
} from 'lucide-react';

interface Video {
  id: string;
  title: string;
  category: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  views: number;
  rating: number;
  description: string;
  tags: string[];
}

const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Perfect Squat Form Guide',
    category: 'Leg Exercises',
    duration: 12,
    difficulty: 'beginner',
    thumbnail: '/images/squat.jpg',
    views: 2500,
    rating: 4.8,
    description: 'Learn the proper form for squats to maximize gains and prevent injuries.',
    tags: ['legs', 'compound', 'form'],
  },
  {
    id: '2',
    title: 'Bench Press Mastery',
    category: 'Chest Exercises',
    duration: 15,
    difficulty: 'intermediate',
    thumbnail: '/images/bench.jpg',
    views: 3200,
    rating: 4.9,
    description: 'Advanced bench press techniques for maximum chest development.',
    tags: ['chest', 'compound', 'strength'],
  },
  {
    id: '3',
    title: 'Deadlift Setup & Execution',
    category: 'Back Exercises',
    duration: 18,
    difficulty: 'intermediate',
    thumbnail: '/images/deadlift.jpg',
    views: 4100,
    rating: 4.7,
    description: 'Complete guide to setting up and executing perfect deadlifts.',
    tags: ['back', 'compound', 'heavy'],
  },
  {
    id: '4',
    title: 'Bicep Curls for Growth',
    category: 'Arm Exercises',
    duration: 8,
    difficulty: 'beginner',
    thumbnail: '/images/bicep.jpg',
    views: 1800,
    rating: 4.6,
    description: 'Techniques to maximize bicep growth with proper curl variations.',
    tags: ['arms', 'isolation', 'hypertrophy'],
  },
  {
    id: '5',
    title: 'Core Strength Fundamentals',
    category: 'Core Exercises',
    duration: 10,
    difficulty: 'beginner',
    thumbnail: '/images/core.jpg',
    views: 2200,
    rating: 4.5,
    description: 'Essential core exercises for stability and strength.',
    tags: ['core', 'stability', 'foundational'],
  },
  {
    id: '6',
    title: 'Shoulder Press Variations',
    category: 'Shoulder Exercises',
    duration: 14,
    difficulty: 'intermediate',
    thumbnail: '/images/shoulder.jpg',
    views: 2900,
    rating: 4.8,
    description: 'Different shoulder press variations for complete shoulder development.',
    tags: ['shoulders', 'press', 'strength'],
  },
];

const categories = [
  'All',
  'Chest Exercises',
  'Back Exercises',
  'Leg Exercises',
  'Arm Exercises',
  'Shoulder Exercises',
  'Core Exercises',
];

export default function VideoLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [watchedVideos, setWatchedVideos] = useState<string[]>(['1', '3']);

  const filteredVideos = mockVideos.filter((video) => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty;

    return matchesCategory && matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-lime-400/20 text-lime-400 border-lime-400/30';
      case 'intermediate':
        return 'bg-orange-400/20 text-orange-400 border-orange-400/30';
      case 'advanced':
        return 'bg-red-400/20 text-red-400 border-red-400/30';
      default:
        return '';
    }
  };

  return (
    <section className="min-h-screen bg-zinc-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Video Form Library
          </h1>
          <p className="text-zinc-300 text-lg">
            Learn proper exercise form and technique from expert coaching videos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search videos by name or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          {/* Category and Difficulty Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-zinc-400" />
                <label className="text-sm font-medium text-zinc-300">Category</label>
              </div>
              <div className="flex overflow-x-auto gap-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-lime-400 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="sm:flex-shrink-0 w-full sm:w-48">
              <label className="text-sm font-medium text-zinc-300 block mb-2">
                Difficulty
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced')
                }
                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-lime-400 transition-colors"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all hover:shadow-lg hover:shadow-zinc-900/50 cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-zinc-800 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                  <Play className="w-12 h-12 text-lime-400 group-hover:scale-110 transition-transform" />
                </div>
                {watchedVideos.includes(video.id) && (
                  <div className="absolute top-2 right-2 bg-lime-400 text-zinc-950 px-2 py-1 rounded text-xs font-semibold">
                    Watched
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Title */}
                <div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-lime-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-xs text-zinc-400">{video.category}</p>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {video.rating}
                  </span>
                </div>

                {/* Difficulty Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded border text-xs font-medium capitalize ${getDifficultyColor(
                      video.difficulty
                    )}`}
                  >
                    {video.difficulty}
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    {video.views.toLocaleString()} views
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {video.tags.length > 2 && (
                    <span className="px-2 py-1 text-zinc-500 text-xs">
                      +{video.tags.length - 2} more
                    </span>
                  )}
                </div>

                {/* Watch Button */}
                <button className="w-full mt-4 px-4 py-2 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all text-sm">
                  {watchedVideos.includes(video.id) ? 'Watch Again' : 'Watch Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No videos found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}
