'use client';

import { format } from 'date-fns';
import { CalendarClock, CheckCircle2 } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';

export function ScheduleBoard() {
  const posts = useWorkflowStore((state) => state.scheduledPosts);
  const campaigns = useWorkflowStore((state) => state.campaigns);
  const updatePostStatus = useWorkflowStore((state) => state.updatePostStatus);

  const ordered = posts
    .slice()
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  return (
    <section className="rounded-3xl border border-white/40 bg-white/90 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Schedule Matrix</h2>
          <p className="text-sm text-slate-500">
            Stay ahead on all content drops and trigger go-live approvals instantly.
          </p>
        </div>
        <CalendarClock className="size-5 text-brand-500" />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {ordered.map((post) => {
          const campaign = campaigns.find((item) => item.id === post.campaignId);
          return (
            <article
              key={post.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-brand-500">
                    {post.channel} • {post.format}
                  </p>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {post.contentTheme}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{post.caption}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${post.status === 'scheduled' ? 'bg-emerald-100 text-emerald-700' : post.status === 'published' ? 'bg-slate-900/90 text-white' : 'bg-amber-100 text-amber-700'}`}
                >
                  {post.status}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <div>
                  <p>{campaign?.name ?? '—'}</p>
                  <p>{format(new Date(post.scheduledAt), 'EEE, MMM d • h:mm a')}</p>
                </div>
                {post.status !== 'published' && (
                  <button
                    type="button"
                    onClick={() =>
                      updatePostStatus(post.id, post.status === 'scheduled' ? 'published' : 'scheduled')
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-brand-300 bg-brand-100 px-3 py-1 font-semibold text-brand-700 hover:bg-brand-200"
                  >
                    <CheckCircle2 className="size-3.5" /> {post.status === 'scheduled' ? 'Mark live' : 'Re-schedule'}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
