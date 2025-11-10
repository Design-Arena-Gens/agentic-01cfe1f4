import { format } from 'date-fns';
import { nanoid } from 'nanoid';
import type {
  AssistantMessage,
  Campaign,
  Channel,
  ContentIdea,
  MetricSnapshot,
  ScheduledPost,
  Task,
} from '@/types/workflow';

interface ContentStrategyInput {
  campaign: Campaign;
  tone: 'warm' | 'expert' | 'energetic';
  focusArea: 'preventive' | 'wellness' | 'chronic-care' | 'surgical';
  audience: 'families' | 'millennials' | 'seniors' | 'corporate';
  keywords: string[];
  channels: Channel[];
}

const toneDescriptors: Record<ContentStrategyInput['tone'], string> = {
  warm: 'empathetic and reassuring, celebrating the human side of care',
  expert: 'evidence-led with clear medical authority and trust markers',
  energetic: 'upbeat and action-oriented, inspiring healthy lifestyle choices',
};

const focusHooks: Record<ContentStrategyInput['focusArea'], string[]> = {
  preventive: [
    'routine screenings',
    'lifestyle coaching',
    'family health packages',
  ],
  wellness: [
    'holistic wellbeing',
    'nutrition-first care',
    'mind-body balance',
  ],
  'chronic-care': [
    'continuity programs',
    'digital monitoring',
    'specialist consults',
  ],
  surgical: [
    'advanced OT infrastructure',
    'fast-track recovery',
    'patient-first safety protocols',
  ],
};

const channelDialects: Record<Channel, string> = {
  Instagram: 'snackable storytelling with carousels and reels',
  Facebook: 'community-first narratives and testimonials',
  LinkedIn: 'thought-leadership and organisational credibility',
  YouTube: 'episodic explainers with doctor presence',
  WhatsApp: 'conversational nudges and clinic updates',
  X: 'quick-hit insights and trending health cues',
  Blog: 'deep dives, expert guidance, and SEO-rich content',
};

export function generateContentIdeas(input: ContentStrategyInput): ContentIdea[] {
  const hooks = focusHooks[input.focusArea];
  const baseKeywords = Array.from(new Set([...input.keywords, ...hooks]));

  const toneTagline = toneDescriptors[input.tone];
  const now = format(new Date(), 'MMM d');

  return new Array(3).fill(null).map((_, idx) => {
    const headline = `${input.campaign.name}: ${hooks[idx % hooks.length]} spotlight`;
    const caption = `For ${input.audience === 'corporate' ? 'organisations' : input.audience} seeking trustworthy care, ${input.campaign.summary.toLowerCase()} transforms the experience. ${toneTagline} — this ${channelDialects[input.channels[idx % input.channels.length]]} drop keeps the conversation alive.`;

    const hashtags = baseKeywords
      .slice(idx, idx + 4)
      .map((keyword) =>
        `#${keyword.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '') || 'BharatLifeCare'}`,
      );

    return {
      id: nanoid(),
      headline,
      caption,
      hashtags,
      callToAction: idx === 0 ? 'Book your preventive health plan consultation' : idx === 1 ? 'Download the Bharat Life Care wellness checklist' : 'Chat with our care navigator for personalised guidance',
      recommendedChannels: Array.from(new Set(input.channels.slice(0, 3))),
    } satisfies ContentIdea;
  });
}

export function generateAssistantResponse(
  history: AssistantMessage[],
  context: {
    campaigns: Campaign[];
    tasks: Task[];
    schedule: ScheduledPost[];
    metrics: MetricSnapshot[];
  },
): AssistantMessage {
  const lastMessage = history.filter((m) => m.role === 'user').at(-1);
  const text = lastMessage?.content.toLowerCase() ?? '';

  let response = `Here is the latest cockpit summary for Bharat Life Care as of ${format(new Date(), 'PPpp')}:
`;

  const activeCampaigns = context.campaigns.filter((c) => c.status !== 'completed');
  response += `• ${activeCampaigns.length} active campaigns, with ${context.schedule.filter((p) => p.status === 'scheduled').length} posts scheduled this week.
`;

  const urgentTasks = context.tasks.filter((task) => task.priority === 'urgent');
  if (urgentTasks.length) {
    response += `• ${urgentTasks.length} urgent tasks flagged: ${urgentTasks.map((t) => t.title).join(', ')}.
`;
  }

  const topChannel = context.metrics
    .slice()
    .sort((a, b) => b.engagementRate - a.engagementRate)[0];
  if (topChannel) {
    response += `• ${topChannel.channel} is leading with ${topChannel.engagementRate.toFixed(1)}% engagement and ${topChannel.followerDelta} new followers.
`;
  }

  if (text.includes('idea') || text.includes('content')) {
    response += '\nI have drafted fresh content ideas referencing preventive care success stories and week-long wellness commitments. Would you like them slotted into the content bank?';
  } else if (text.includes('report') || text.includes('roi')) {
    const bestRoa = context.metrics.slice().sort((a, b) => b.roas - a.roas)[0];
    if (bestRoa) {
      response += `
ROI highlight: ${bestRoa.channel} is compounding returns at ${bestRoa.roas.toFixed(2)}x with controlled spend of ₹${bestRoa.spend.toFixed(0)}.`;
    }
  } else if (text.includes('schedule') || text.includes('calendar')) {
    const nextPost = context.schedule
      .slice()
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];
    if (nextPost) {
      response += `
Your next content drop is a ${nextPost.format} for ${nextPost.channel} on ${format(new Date(nextPost.scheduledAt), 'PPpp')}.`;
    }
  } else {
    response += '\nLet me know if you want me to nudge the medical teams for testimonials, draft captions, or rebalance the channel mix.';
  }

  return {
    id: nanoid(),
    role: 'assistant',
    content: response,
    timestamp: new Date().toISOString(),
  };
}

export function generateCadenceSuggestion(
  channels: Channel[],
): Array<{ channel: Channel; cadence: string }> {
  return channels.map((channel) => {
    switch (channel) {
      case 'Instagram':
        return { channel, cadence: '5x weekly blend of reels, carousels, and stories' };
      case 'LinkedIn':
        return { channel, cadence: '3x weekly, mix of leadership POV and care innovation' };
      case 'YouTube':
        return { channel, cadence: 'Bi-weekly, 6-8 min doctor-led explainers with patient queries' };
      case 'WhatsApp':
        return { channel, cadence: 'Twice weekly nudges for appointment slots and care plans' };
      case 'X':
        return { channel, cadence: 'Daily industry cues with Bharat Life Care POV' };
      case 'Blog':
        return { channel, cadence: 'Weekly long-form guide optimised for local health intent' };
      default:
        return { channel, cadence: 'Maintain presence with contextual storytelling' };
    }
  });
}
