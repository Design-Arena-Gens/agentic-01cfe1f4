'use client';

import { format } from 'date-fns';
import { ArrowRight, ClipboardList, MoveRight } from 'lucide-react';
import { useMemo } from 'react';
import { useWorkflowStore } from '@store/workflow-store';
import type { WorkflowStage } from '@/types/workflow';

const stages: WorkflowStage[] = [
  'Ideation',
  'Drafting',
  'Review',
  'Approval',
  'Scheduled',
  'Published',
];

export function WorkflowBoard() {
  const tasks = useWorkflowStore((state) => state.tasks);
  const advanceTask = useWorkflowStore((state) => state.advanceTask);
  const campaigns = useWorkflowStore((state) => state.campaigns);

  const grouped = useMemo(() => {
    return stages.map((stage) => ({
      stage,
      tasks: tasks.filter((task) => task.stage === stage),
    }));
  }, [tasks]);

  return (
    <section className="rounded-3xl border border-white/40 bg-white/90 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Workflow Runway</h2>
          <p className="text-sm text-slate-500">
            Track every deliverable end-to-end with instant stage transitions.
          </p>
        </div>
        <ClipboardList className="size-5 text-brand-500" />
      </div>

      <div className="mt-5 grid gap-4 overflow-x-auto pb-2 lg:grid-cols-3 xl:grid-cols-6">
        {grouped.map((column) => (
          <div key={column.stage} className="flex h-full min-w-[220px] flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
              <span>{column.stage}</span>
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.65rem] font-semibold text-brand-600">
                {column.tasks.length}
              </span>
            </header>

            {column.tasks.length === 0 ? (
              <p className="text-xs text-slate-400">Awaiting assignment</p>
            ) : (
              column.tasks.map((task) => {
                const campaign = campaigns.find((item) => item.id === task.campaignId);
                const nextStage = stages[Math.min(stages.indexOf(task.stage) + 1, stages.length - 1)];
                return (
                  <article key={task.id} className="space-y-3 rounded-xl border border-white/60 bg-white p-3 text-sm text-slate-600 shadow-card">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                      <p className="text-xs text-slate-500">{campaign?.name ?? '—'}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{task.owner}</span>
                      <span>Due {format(new Date(task.dueDate), 'dd MMM')}</span>
                    </div>
                    <span
                      className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${task.priority === 'urgent' ? 'bg-red-100 text-red-600' : task.priority === 'high' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    {task.stage !== 'Published' && (
                      <button
                        type="button"
                        onClick={() => advanceTask(task.id, nextStage)}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-300/70 bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 hover:bg-brand-200"
                      >
                        Advance <MoveRight className="size-3.5" /> {nextStage}
                      </button>
                    )}
                  </article>
                );
              })
            )}
          </div>
        ))}
      </div>

      <footer className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
        <ArrowRight className="size-3" /> Drag-free actions: progress tasks with one click
      </footer>
    </section>
  );
}
