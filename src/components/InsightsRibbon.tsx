'use client';

import { Activity, BarChart3, TrendingUp } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';

export function InsightsRibbon() {
  const metrics = useWorkflowStore((state) => state.metrics);
  const tasks = useWorkflowStore((state) => state.tasks);
  const scheduled = useWorkflowStore((state) => state.scheduledPosts);

  const leadingChannel = metrics.slice().sort((a, b) => b.engagementRate - a.engagementRate)[0];
  const liveThisWeek = scheduled.filter((post) => post.status === 'scheduled').length;
  const reviewQueue = tasks.filter((task) => task.stage === 'Review').length;

  return (
    <section className="mx-auto mt-6 max-w-6xl space-y-3 px-6">
      <div className="grid gap-4 md:grid-cols-3">
        <InsightCard
          icon={<TrendingUp className="size-5" />}
          title="Momentum Channel"
          metric={leadingChannel?.channel ?? 'TBC'}
          descriptor={`${leadingChannel?.engagementRate.toFixed(1) ?? '0'}% engagement`}
        />
        <InsightCard
          icon={<BarChart3 className="size-5" />}
          title="Scheduled This Week"
          metric={String(liveThisWeek)}
          descriptor="multi-channel touchpoints ready"
        />
        <InsightCard
          icon={<Activity className="size-5" />}
          title="In Review"
          metric={String(reviewQueue)}
          descriptor="captions awaiting compliance"
        />
      </div>
    </section>
  );
}

interface InsightCardProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  descriptor: string;
}

function InsightCard({ icon, title, metric, descriptor }: InsightCardProps) {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/80 p-5 shadow-card">
      <div className="flex items-center gap-3 text-brand-600">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          {icon}
        </span>
        <p className="text-sm font-medium uppercase tracking-wide">{title}</p>
      </div>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{metric}</p>
      <p className="text-sm text-slate-500">{descriptor}</p>
    </div>
  );
}
