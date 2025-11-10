'use client';

import { useEffect } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';
import { generateCadenceSuggestion } from '@lib/ai';

const tones = [
  { value: 'warm', label: 'Warm & reassuring' },
  { value: 'expert', label: 'Trust-building expertise' },
  { value: 'energetic', label: 'Energetic & inspiring' },
] as const;

const focusAreas = [
  { value: 'preventive', label: 'Preventive excellence' },
  { value: 'wellness', label: 'Lifestyle & wellness' },
  { value: 'chronic-care', label: 'Chronic condition continuity' },
  { value: 'surgical', label: 'Surgical prowess' },
] as const;

const audiences = [
  { value: 'families', label: 'Families' },
  { value: 'millennials', label: 'Millennials' },
  { value: 'seniors', label: 'Seniors' },
  { value: 'corporate', label: 'Corporate HR' },
] as const;

export function ContentStudio() {
  const preferences = useWorkflowStore((state) => state.preferences);
  const ideaBank = useWorkflowStore((state) => state.ideaBank);
  const regenerateIdeas = useWorkflowStore((state) => state.regenerateIdeas);
  const updatePreferences = useWorkflowStore((state) => state.updatePreferences);

  useEffect(() => {
    if (ideaBank.length === 0) {
      regenerateIdeas();
    }
  }, [ideaBank.length, regenerateIdeas]);

  const cadence = generateCadenceSuggestion(preferences.channels);

  return (
    <section className="rounded-3xl border border-white/40 bg-white/90 p-6 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">AI Content Studio</h2>
          <p className="text-sm text-slate-500">
            Fine-tune tone and cohorts, auto-generate multi-channel narratives.
          </p>
        </div>
        <button
          type="button"
          onClick={regenerateIdeas}
          className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-brand-100 px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-200"
        >
          <Wand2 className="size-4" /> Refresh idea bank
        </button>
      </div>

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <Selector
              label="Tone"
              value={preferences.tone}
              options={tones.map((tone) => ({ value: tone.value, label: tone.label }))}
              onChange={(value) => updatePreferences({ tone: value as typeof preferences.tone })}
            />
            <Selector
              label="Focus area"
              value={preferences.focusArea}
              options={focusAreas.map((item) => ({ value: item.value, label: item.label }))}
              onChange={(value) =>
                updatePreferences({ focusArea: value as typeof preferences.focusArea })
              }
            />
            <Selector
              label="Audience"
              value={preferences.audience}
              options={audiences.map((item) => ({ value: item.value, label: item.label }))}
              onChange={(value) =>
                updatePreferences({ audience: value as typeof preferences.audience })
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hero keywords
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {preferences.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  #{keyword}
                </span>
              ))}
            </div>
            <input
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
              placeholder="Add a keyword and press enter"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  const value = event.currentTarget.value.trim();
                  if (value) {
                    updatePreferences({ keywords: [...preferences.keywords, value] });
                    event.currentTarget.value = '';
                  }
                }
              }}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Channel cadence
            </label>
            <ul className="mt-3 space-y-2">
              {cadence.map((item) => (
                <li
                  key={item.channel}
                  className="flex items-center justify-between rounded-2xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-brand-700"
                >
                  <span className="font-semibold">{item.channel}</span>
                  <span>{item.cadence}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          {ideaBank.map((idea) => (
            <article key={idea.id} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-brand-50 to-white p-5">
              <div className="flex items-center gap-2 text-brand-600">
                <Sparkles className="size-4" />
                <p className="text-xs font-semibold uppercase tracking-widest">Idea capsule</p>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">{idea.headline}</h3>
              <p className="mt-2 text-sm text-slate-600">{idea.caption}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-brand-700">
                {idea.hashtags.map((hashtag) => (
                  <span key={hashtag} className="rounded-full bg-brand-600/10 px-3 py-1">
                    {hashtag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm font-medium text-brand-700">
                CTA: {idea.callToAction}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Recommended: {idea.recommendedChannels.join(' • ')}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

interface SelectorProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function Selector({ label, value, options, onChange }: SelectorProps) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 focus:border-brand-400 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
