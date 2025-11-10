'use client';

import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { CalendarRange, PlusCircle } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';
import type { Channel } from '@/types/workflow';

const allChannels: Channel[] = [
  'Instagram',
  'Facebook',
  'LinkedIn',
  'YouTube',
  'WhatsApp',
  'X',
  'Blog',
];

export function CampaignPlanner() {
  const campaigns = useWorkflowStore((state) => state.campaigns);
  const addCampaign = useWorkflowStore((state) => state.addCampaign);
  const updatePreferences = useWorkflowStore((state) => state.updatePreferences);

  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [summary, setSummary] = useState('');
  const [channels, setChannels] = useState<Channel[]>(['Instagram', 'WhatsApp']);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const upcoming = useMemo(
    () =>
      campaigns
        .slice()
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()),
    [campaigns],
  );

  const toggleChannel = (channel: Channel) => {
    setChannels((prev) =>
      prev.includes(channel) ? prev.filter((item) => item !== channel) : [...prev, channel],
    );
  };

  const handleCreate = () => {
    if (!name || !objective || channels.length === 0) return;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 21);

    addCampaign({
      name,
      objective,
      summary: summary || objective,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      status: 'planning',
      priority,
      channels,
      heroMetric: 'Leads generated',
    });

    updatePreferences({ channels });
    setName('');
    setObjective('');
    setSummary('');
  };

  return (
    <section className="rounded-3xl border border-white/40 bg-white/90 p-6 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Campaign Control Room</h2>
          <p className="text-sm text-slate-500">
            Align channels, goals, and runway for Bharat Life Care narratives.
          </p>
        </div>
        <CalendarRange className="size-5 text-brand-500" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {upcoming.map((campaign) => (
            <article
              key={campaign.id}
              className="rounded-2xl border border-brand-100/80 bg-brand-50/60 p-4 hover:border-brand-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-brand-800">{campaign.name}</h3>
                  <p className="text-xs uppercase tracking-wide text-brand-600">
                    {campaign.priority.toUpperCase()} • {campaign.status}
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  {format(new Date(campaign.startDate), 'MMM d')} –{' '}
                  {format(new Date(campaign.endDate), 'MMM d')}
                </p>
              </div>
              <p className="mt-2 text-sm text-slate-600">{campaign.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-700">
                {campaign.channels.map((channel) => (
                  <span key={channel} className="rounded-full bg-white px-3 py-1 shadow-sm">
                    {channel}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-dashed border-brand-300/80 bg-white p-4">
          <h3 className="text-base font-semibold text-slate-900">Launch a fresh initiative</h3>
          <p className="text-sm text-slate-500">
            Capture the essentials and the AI steward will align cadence and copy pipelines.
          </p>

          <div className="mt-4 space-y-3">
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              placeholder="Campaign name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              placeholder="Primary objective"
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
            />
            <textarea
              className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              placeholder="Narrative direction"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
            />
            <div>
              <p className="text-xs font-medium text-slate-600">Channel mix</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {allChannels.map((channel) => {
                  const active = channels.includes(channel);
                  return (
                    <button
                      key={channel}
                      type="button"
                      onClick={() => toggleChannel(channel)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${active ? 'border-brand-500 bg-brand-100 text-brand-700' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'}`}
                    >
                      {channel}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <label className="text-xs font-medium text-slate-600">Priority</label>
              <select
                className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 text-sm"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as 'high' | 'medium' | 'low')
                }
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
              disabled={!name || !objective}
            >
              <PlusCircle className="size-4" /> Launch campaign blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
