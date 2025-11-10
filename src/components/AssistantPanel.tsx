'use client';

import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { useWorkflowStore } from '@store/workflow-store';

export function AssistantPanel() {
  const messages = useWorkflowStore((state) => state.assistantThread);
  const pushAssistantMessage = useWorkflowStore((state) => state.pushAssistantMessage);
  const [prompt, setPrompt] = useState('Can you suggest hooks for metabolic health month?');
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    if (!prompt.trim()) return;
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    pushAssistantMessage(prompt.trim());
    setPrompt('');
    setIsSending(false);
    inputRef.current?.focus();
  };

  return (
    <section className="flex h-full flex-col gap-4 rounded-3xl border border-white/40 bg-white/90 p-6 shadow-card">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">AI Mission Control</h2>
          <p className="text-sm text-slate-500">
            Ask for buzzworthy ideas, deployment help, or KPI intelligence.
          </p>
        </div>
        <Bot className="size-5 text-brand-500" />
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        {messages.map((message) => (
          <article
            key={message.id}
            className={`flex gap-3 rounded-2xl border bg-white p-3 text-sm leading-relaxed shadow-sm ${message.role === 'assistant' ? 'border-brand-200/60 text-slate-700' : 'border-slate-200 text-slate-900'}`}
          >
            <span
              className={`flex size-9 items-center justify-center rounded-full ${message.role === 'assistant' ? 'bg-brand-100 text-brand-700' : 'bg-slate-900 text-white'}`}
            >
              {message.role === 'assistant' ? <Bot className="size-4" /> : <User className="size-4" />}
            </span>
            <div className="space-y-1">
              <p className="whitespace-pre-line">{message.content}</p>
              <p className="text-[0.65rem] uppercase tracking-widest text-slate-400">
                {format(new Date(message.timestamp), 'MMM d • h:mm a')}
              </p>
            </div>
          </article>
        ))}
      </div>

      <footer className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-inner">
        <textarea
          ref={inputRef}
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none"
          placeholder="Draft a WhatsApp drip for diagnostics, share ROI, nudge compliance..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <p>Agent is primed with Bharat Life Care&apos;s current run sheet.</p>
          <button
            type="button"
            disabled={isSending || !prompt.trim()}
            onClick={sendMessage}
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 font-semibold text-white shadow-card transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
          >
            {isSending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            {isSending ? 'Syncing' : 'Send prompt'}
          </button>
        </div>
      </footer>
    </section>
  );
}
