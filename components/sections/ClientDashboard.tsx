'use client';

import { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  TrendingDown,
  TrendingUp,
  Zap,
  Calendar,
  Download,
  Settings,
  LogOut,
  ChevronDown,
  Target,
  AlertCircle,
} from 'lucide-react';

interface ProgressData {
  week: string;
  weight: number;
  chest?: number;
  waist?: number;
  arms?: number;
}

interface SessionData {
  date: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
}

interface DashboardProps {
  clientName?: string;
  currentGoal?: string;
}

export default function ClientDashboard({ clientName = 'Client', currentGoal = 'Fat Loss' }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'sessions' | 'notes'>('overview');
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'measurements'>('weight');

  // Mock progress data
  const weightData: ProgressData[] = [
    { week: 'Week 1', weight: 75 },
    { week: 'Week 2', weight: 74.5 },
    { week: 'Week 3', weight: 74 },
    { week: 'Week 4', weight: 73.5 },
    { week: 'Week 5', weight: 73 },
    { week: 'Week 6', weight: 72.5 },
    { week: 'Week 7', weight: 72 },
    { week: 'Week 8', weight: 71.5 },
  ];

  const measurementsData: ProgressData[] = [
    { week: 'Week 1', chest: 95, waist: 85, arms: 32 },
    { week: 'Week 2', chest: 94.5, waist: 84.5, arms: 32.2 },
    { week: 'Week 3', chest: 94, waist: 84, arms: 32.4 },
    { week: 'Week 4', chest: 93.5, waist: 83.5, arms: 32.6 },
    { week: 'Week 5', chest: 93, waist: 83, arms: 32.8 },
    { week: 'Week 6', chest: 92.5, waist: 82.5, arms: 33 },
    { week: 'Week 7', chest: 92, waist: 82, arms: 33.2 },
    { week: 'Week 8', chest: 91.5, waist: 81.5, arms: 33.4 },
  ];

  const recentSessions: SessionData[] = [
    {
      date: '2024-04-25',
      exercise: 'Bench Press',
      sets: 4,
      reps: 8,
      weight: 100,
      notes: 'Great form today, felt strong',
    },
    {
      date: '2024-04-23',
      exercise: 'Squats',
      sets: 5,
      reps: 5,
      weight: 140,
      notes: 'Hit PR! New personal record',
    },
    {
      date: '2024-04-21',
      exercise: 'Deadlifts',
      sets: 3,
      reps: 5,
      weight: 180,
      notes: 'Felt a bit fatigued, good recovery session',
    },
    {
      date: '2024-04-19',
      exercise: 'Incline Dumbbell Press',
      sets: 3,
      reps: 10,
      weight: 45,
      notes: 'Mind-muscle connection was excellent',
    },
  ];

  const stats = [
    {
      label: 'Total Weight Lost',
      value: '3.5 kg',
      change: '-4.67%',
      icon: TrendingDown,
      color: 'text-lime-400',
    },
    {
      label: 'Sessions Completed',
      value: '18/20',
      change: '90%',
      icon: Zap,
      color: 'text-orange-400',
    },
    {
      label: 'Waist Reduction',
      value: '3.5 cm',
      change: '-4.12%',
      icon: TrendingDown,
      color: 'text-cyan-400',
    },
    {
      label: 'Strength Gain',
      value: '+15%',
      change: 'Avg',
      icon: TrendingUp,
      color: 'text-lime-400',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {clientName}!</h1>
              <p className="text-sm text-zinc-400 mt-1">Goal: {currentGoal}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-zinc-400" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <LogOut className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-xs font-semibold text-lime-400">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="border-b border-zinc-800 mb-8">
          <div className="flex gap-8">
            {(['overview', 'progress', 'sessions', 'notes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-semibold transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-lime-400 text-white'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Next Session */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-lime-400" />
                    Next Scheduled Session
                  </h2>
                  <button className="px-4 py-2 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all text-sm">
                    Reschedule
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">Friday, April 26, 2024</p>
                  <p className="text-zinc-400">6:00 PM - 6:45 PM IST</p>
                  <p className="text-sm text-zinc-500 mt-3">
                    Your trainer will send you the call link 15 minutes before the session starts.
                    Make sure you&apos;re in a suitable space for workout.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-lime-400" />
                    <h3 className="font-semibold">Daily Protein Target</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold">156g / 180g</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-lime-400 to-lime-300 h-full"
                        style={{ width: '87%' }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">86.7% complete today</p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-orange-400" />
                    <h3 className="font-semibold">Weekly Activity</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold">18 / 20</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-300 h-full"
                        style={{ width: '90%' }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">2 sessions remaining</p>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingDown className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-semibold">Program Progress</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between mb-2">
                      <span className="text-2xl font-bold">Week 8 / 15</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-cyan-300 h-full"
                        style={{ width: '53%' }}
                      />
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">53% of program complete</p>
                  </div>
                </div>
              </div>

              {/* Trainer Notes */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Latest Trainer Notes</h2>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <p className="text-sm text-zinc-300 mb-3">
                    Great progress this week! Your form on squats has improved significantly. Try to
                    focus on the mind-muscle connection during compound movements. Keep the same nutrition
                    plan, it&apos;s clearly working.
                  </p>
                  <p className="text-xs text-zinc-500">
                    Last updated: April 25, 2024 at 6:45 PM
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              <div className="flex gap-2 mb-4">
                {(['weight', 'measurements'] as const).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors capitalize ${
                      selectedMetric === metric
                        ? 'bg-lime-400 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                {selectedMetric === 'weight' ? (
                  <>
                    <h2 className="text-xl font-bold mb-6">Weight Progress</h2>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={weightData}>
                        <defs>
                          <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#84cc16" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#84cc16" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis dataKey="week" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="weight"
                          stroke="#84cc16"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorWeight)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
                      <p className="text-sm text-zinc-300">
                        <strong>Total Loss:</strong> 3.5 kg | <strong>Average per week:</strong> 0.44 kg
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-6">Body Measurements</h2>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={measurementsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                        <XAxis dataKey="week" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="chest"
                          stroke="#84cc16"
                          strokeWidth={2}
                          dot={{ fill: '#84cc16', r: 4 }}
                          name="Chest (cm)"
                        />
                        <Line
                          type="monotone"
                          dataKey="waist"
                          stroke="#fb923c"
                          strokeWidth={2}
                          dot={{ fill: '#fb923c', r: 4 }}
                          name="Waist (cm)"
                        />
                        <Line
                          type="monotone"
                          dataKey="arms"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          dot={{ fill: '#06b6d4', r: 4 }}
                          name="Arms (cm)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-xl font-bold">Recent Sessions</h2>
              </div>
              <div className="divide-y divide-zinc-800">
                {recentSessions.map((session, idx) => (
                  <div key={idx} className="p-6 hover:bg-zinc-800/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold">{session.exercise}</h3>
                        <p className="text-sm text-zinc-400">
                          {new Date(session.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded text-xs font-semibold transition-colors">
                        Edit
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-zinc-400 text-xs">Sets</p>
                        <p className="font-bold text-lg">{session.sets}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Reps</p>
                        <p className="font-bold text-lg">{session.reps}</p>
                      </div>
                      <div>
                        <p className="text-zinc-400 text-xs">Weight</p>
                        <p className="font-bold text-lg">{session.weight} kg</p>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-400 bg-zinc-800/50 p-3 rounded">
                      {session.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Notes & Progress</h2>
                <button className="px-4 py-2 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all text-sm">
                  Add Note
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    date: 'April 25, 2024',
                    title: 'Feeling stronger',
                    content: 'Hit a new PR on bench press today! Finally broke through the 100kg barrier.',
                  },
                  {
                    date: 'April 22, 2024',
                    title: 'Recovery tips working',
                    content: 'Been following the sleep schedule and it&apos;s making a huge difference in recovery.',
                  },
                  {
                    date: 'April 19, 2024',
                    title: 'Nutrition adjustment',
                    content: 'Started the new nutrition plan from Kaustubh. Already noticing better energy levels.',
                  },
                ].map((note, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-zinc-500 mb-1">{note.date}</p>
                        <h3 className="text-lg font-bold">{note.title}</h3>
                      </div>
                      <button className="text-zinc-400 hover:text-white p-1">
                        <ChevronDown className="w-5 h-5 rotate-180" />
                      </button>
                    </div>
                    <p className="text-zinc-300">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
