'use client';

import ClientDashboard from '@/components/sections/ClientDashboard';

export default function DashboardPage() {
  return (
    <main className="bg-zinc-950 min-h-screen text-white">
      <ClientDashboard clientName="Rajesh" currentGoal="Fat Loss" />
    </main>
  );
}
