'use client';

import { useMemo } from 'react';
import { CalendarCheck2, Sparkles, Workflow } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';

export function TopBar() {
  const campaigns = useWorkflowStore((state) => state.campaigns);
  const tasks = useWorkflowStore((state) => state.tasks);
  const scheduledPosts = useWorkflowStore((state) => state.scheduledPosts);

  const summary = useMemo(() => {
    const active = campaigns.filter((c) => c.status !== 'completed').length;
    const urgent = tasks.filter((task) => task.priority === 'urgent').length;
    const scheduled = scheduledPosts.filter((post) => post.status === 'scheduled').length;
    return { active, urgent, scheduled };
  }, [campaigns, tasks, scheduledPosts]);

  return (
    <header className="sticky top-0 z-30 backdrop-blur border-b border-white/30 bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Bharat Life Care</p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Social Media Intelligence Steward
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Badge icon={<Sparkles className="size-3.5" />} label={`${summary.active} live campaigns`} />
          <Badge icon={<Workflow className="size-3.5" />} label={`${summary.urgent} urgent workflows`} />
          <Badge icon={<CalendarCheck2 className="size-3.5" />} label={`${summary.scheduled} scheduled drops`} />
        </div>
      </div>
    </header>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-brand-700 shadow-card">
      {icon}
      <span>{label}</span>
    </span>
  );
}
