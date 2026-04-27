'use client';

import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Plus, Minus, Flame, Zap, Heart } from 'lucide-react';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

interface NutritionDay {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: MealItem[];
}

const mockMeals: MealItem[] = [
  {
    id: '1',
    name: 'Oatmeal with Berries & Protein Powder',
    calories: 380,
    protein: 30,
    carbs: 45,
    fat: 8,
    time: '8:00 AM',
  },
  {
    id: '2',
    name: 'Chicken Breast with Rice & Broccoli',
    calories: 520,
    protein: 45,
    carbs: 55,
    fat: 10,
    time: '12:30 PM',
  },
  {
    id: '3',
    name: 'Apple with Almond Butter',
    calories: 200,
    protein: 7,
    carbs: 25,
    fat: 11,
    time: '3:00 PM',
  },
  {
    id: '4',
    name: 'Salmon with Sweet Potato',
    calories: 580,
    protein: 42,
    carbs: 52,
    fat: 18,
    time: '7:00 PM',
  },
];

const macroGoals = {
  calories: 2100,
  protein: 150,
  carbs: 235,
  fat: 65,
};

const weeklyData = [
  { day: 'Mon', calories: 2050, target: 2100 },
  { day: 'Tue', calories: 2150, target: 2100 },
  { day: 'Wed', calories: 2000, target: 2100 },
  { day: 'Thu', calories: 2120, target: 2100 },
  { day: 'Fri', calories: 2080, target: 2100 },
  { day: 'Sat', calories: 2200, target: 2100 },
  { day: 'Sun', calories: 1950, target: 2100 },
];

export default function NutritionTracker() {
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);
  const [showAddMeal, setShowAddMeal] = useState(false);

  const totalCalories = mockMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = mockMeals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalCarbs = mockMeals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalFat = mockMeals.reduce((sum, meal) => sum + meal.fat, 0);

  const macroData = [
    { name: 'Protein', value: totalProtein, target: macroGoals.protein },
    { name: 'Carbs', value: totalCarbs, target: macroGoals.carbs },
    { name: 'Fat', value: totalFat, target: macroGoals.fat },
  ];

  const macroChartData = [
    { name: 'Protein', value: totalProtein, fill: '#84cc16' },
    { name: 'Carbs', value: totalCarbs, fill: '#fb923c' },
    { name: 'Fat', value: totalFat, fill: '#06b6d4' },
  ];

  const caloriePercentage = (totalCalories / macroGoals.calories) * 100;
  const proteinPercentage = (totalProtein / macroGoals.protein) * 100;
  const carbsPercentage = (totalCarbs / macroGoals.carbs) * 100;
  const fatPercentage = (totalFat / macroGoals.fat) * 100;

  return (
    <section className="min-h-screen bg-zinc-950 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Nutrition Tracker
          </h1>
          <p className="text-zinc-300 text-lg">
            Track your daily macros and calories to achieve your fitness goals
          </p>
        </div>

        {/* Main Stats Card */}
        <div className="bg-gradient-to-br from-lime-400/20 to-lime-400/5 border border-lime-400/30 rounded-xl p-6 md:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calorie Ring */}
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Consumed', value: totalCalories },
                        { name: 'Remaining', value: Math.max(0, macroGoals.calories - totalCalories) },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      <Cell fill="#84cc16" />
                      <Cell fill="#3f3f46" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-white">{totalCalories}</div>
                  <div className="text-sm text-zinc-400">/ {macroGoals.calories} cal</div>
                </div>
              </div>
            </div>

            {/* Macro Summary */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white mb-6">Today's Macros</h2>

              {/* Protein */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-white">
                    <Zap className="w-4 h-4 text-lime-400" />
                    Protein
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-lime-400">{totalProtein}g</span>
                    <span className="text-zinc-400"> / {macroGoals.protein}g</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-lime-400 h-full transition-all"
                    style={{ width: `${Math.min(proteinPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Carbs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-white">
                    <Flame className="w-4 h-4 text-orange-400" />
                    Carbs
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-orange-400">{totalCarbs}g</span>
                    <span className="text-zinc-400"> / {macroGoals.carbs}g</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-orange-400 h-full transition-all"
                    style={{ width: `${Math.min(carbsPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Fat */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-white">
                    <Heart className="w-4 h-4 text-cyan-400" />
                    Fat
                  </span>
                  <span className="text-sm">
                    <span className="font-bold text-cyan-400">{totalFat}g</span>
                    <span className="text-zinc-400"> / {macroGoals.fat}g</span>
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-400 h-full transition-all"
                    style={{ width: `${Math.min(fatPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Macro Distribution */}
          <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Macro Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={macroChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}g`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Overview */}
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Weekly Calorie Intake</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="calories" fill="#84cc16" name="Consumed" />
                <Bar dataKey="target" fill="#3f3f46" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Meals */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Today's Meals</h2>
            <button
              onClick={() => setShowAddMeal(!showAddMeal)}
              className="flex items-center gap-2 px-4 py-2 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Meal
            </button>
          </div>

          {showAddMeal && (
            <div className="p-6 border-b border-zinc-800 bg-zinc-800/50">
              <p className="text-sm text-zinc-400 mb-4">
                Connect with MyFitnessPal or manually search for foods in the database to add meals.
              </p>
              <button className="px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all text-sm font-medium">
                Search Foods
              </button>
            </div>
          )}

          <div className="divide-y divide-zinc-800">
            {mockMeals.map((meal) => (
              <div
                key={meal.id}
                className="p-6 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                onClick={() => setSelectedMeal(selectedMeal?.id === meal.id ? null : meal)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white">{meal.name}</h3>
                    <p className="text-sm text-zinc-400">{meal.time}</p>
                  </div>
                  <span className="text-lg font-bold text-lime-400">{meal.calories} cal</span>
                </div>

                {/* Macro Breakdown */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="bg-zinc-800/50 rounded p-2">
                    <p className="text-zinc-400 text-xs">Protein</p>
                    <p className="font-semibold">{meal.protein}g</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded p-2">
                    <p className="text-zinc-400 text-xs">Carbs</p>
                    <p className="font-semibold">{meal.carbs}g</p>
                  </div>
                  <div className="bg-zinc-800/50 rounded p-2">
                    <p className="text-zinc-400 text-xs">Fat</p>
                    <p className="font-semibold">{meal.fat}g</p>
                  </div>
                </div>

                {selectedMeal?.id === meal.id && (
                  <div className="mt-4 pt-4 border-t border-zinc-700">
                    <button className="flex items-center gap-2 text-red-400 hover:text-red-300 font-medium text-sm">
                      <Minus className="w-4 h-4" />
                      Remove Meal
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {mockMeals.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-zinc-400">No meals logged yet. Add your first meal!</p>
            </div>
          )}
        </div>

        {/* Nutrition Notes */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Daily Notes</h2>
          <textarea
            placeholder="How was your appetite today? Any cravings? Notes for your trainer..."
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-colors resize-none"
            rows={3}
          />
          <button className="mt-4 px-6 py-2 bg-lime-400 text-zinc-950 font-semibold rounded-lg hover:bg-lime-300 transition-all text-sm">
            Save Notes
          </button>
        </div>
      </div>
    </section>
  );
}
