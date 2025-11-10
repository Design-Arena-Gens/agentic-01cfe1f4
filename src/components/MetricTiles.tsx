'use client';

import { Gauge, HeartPulse, Users } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';

export function MetricTiles() {
  const metrics = useWorkflowStore((state) => state.metrics);

  const totalConversions = metrics.reduce((acc, metric) => acc + metric.conversions, 0);
  const averageEngagement =
    metrics.reduce((acc, metric) => acc + metric.engagementRate, 0) / Math.max(metrics.length, 1);
  const totalFollowers = metrics.reduce((acc, metric) => acc + metric.followerDelta, 0);

  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Tile
          icon={<HeartPulse className="size-5" />}
          title="Care Conversions"
          metric={`${totalConversions}`}
          descriptor="Enquiries driven this sprint"
        />
        <Tile
          icon={<Users className="size-5" />}
          title="Community Growth"
          metric={`+${totalFollowers}`}
          descriptor="Net new followers"
        />
        <Tile
          icon={<Gauge className="size-5" />}
          title="Avg Engagement"
          metric={`${averageEngagement.toFixed(1)}%`}
          descriptor="Across active channels"
        />
      </div>
    </section>
  );
}

interface TileProps {
  icon: React.ReactNode;
  title: string;
  metric: string;
  descriptor: string;
}

function Tile({ icon, title, metric, descriptor }: TileProps) {
  return (
    <div className="rounded-3xl border border-white/40 bg-white/90 p-5 shadow-card">
      <div className="flex items-center gap-3 text-brand-600">
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-brand-100">
          {icon}
        </span>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{title}</p>
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{metric}</p>
      <p className="text-sm text-slate-500">{descriptor}</p>
    </div>
  );
}
