import { addDays, formatISO } from 'date-fns';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import type {
  AssistantMessage,
  Campaign,
  Channel,
  MetricSnapshot,
  ScheduledPost,
  Task,
  WorkflowStage,
} from '@/types/workflow';
import { generateAssistantResponse, generateContentIdeas } from '@lib/ai';

interface StrategyPreferences {
  tone: 'warm' | 'expert' | 'energetic';
  focusArea: 'preventive' | 'wellness' | 'chronic-care' | 'surgical';
  audience: 'families' | 'millennials' | 'seniors' | 'corporate';
  keywords: string[];
  channels: Channel[];
}

interface WorkflowState {
  campaigns: Campaign[];
  tasks: Task[];
  scheduledPosts: ScheduledPost[];
  metrics: MetricSnapshot[];
  assistantThread: AssistantMessage[];
  preferences: StrategyPreferences;
  ideaBank: ReturnType<typeof generateContentIdeas>;
  addCampaign: (payload: Omit<Campaign, 'id'>) => void;
  addTask: (payload: Omit<Task, 'id'>) => void;
  advanceTask: (id: string, stage: WorkflowStage) => void;
  updatePostStatus: (id: string, status: ScheduledPost['status']) => void;
  schedulePost: (payload: Omit<ScheduledPost, 'id'>) => void;
  pushAssistantMessage: (content: string) => void;
  refreshAssistant: () => void;
  regenerateIdeas: () => void;
  updatePreferences: (partial: Partial<StrategyPreferences>) => void;
}

const seedCampaigns: Campaign[] = [
  {
    id: nanoid(),
    name: 'Heartbeat of Preventive Care Week',
    objective: 'Drive 120 preventive health check enrolments',
    summary: 'Highlight the preventive cardiology protocol and family wellness plans',
    startDate: formatISO(new Date()),
    endDate: formatISO(addDays(new Date(), 14)),
    status: 'live',
    priority: 'high',
    channels: ['Instagram', 'LinkedIn', 'WhatsApp', 'Blog'],
    heroMetric: 'Wellness package enrolments',
  },
  {
    id: nanoid(),
    name: 'Precision Oncology Navigator',
    objective: 'Build recall for oncologist-led tumour board',
    summary: 'Communicate Bharat Life Care’s multi-disciplinary oncology program',
    startDate: formatISO(addDays(new Date(), 3)),
    endDate: formatISO(addDays(new Date(), 28)),
    status: 'planning',
    priority: 'medium',
    channels: ['Facebook', 'YouTube', 'Instagram'],
    heroMetric: 'Consultations booked',
  },
];

const seedTasks: Task[] = [
  {
    id: nanoid(),
    title: 'Source cardiologist testimonial for reel',
    stage: 'Review',
    owner: 'Aparna (Medical marketing)',
    dueDate: formatISO(addDays(new Date(), 1)),
    campaignId: seedCampaigns[0].id,
    priority: 'urgent',
    notes: 'Need compliance nod for Dr. Menon footage',
  },
  {
    id: nanoid(),
    title: 'Draft LinkedIn POV on preventive diagnostics',
    stage: 'Drafting',
    owner: 'Rahul (Copy)',
    dueDate: formatISO(addDays(new Date(), 2)),
    campaignId: seedCampaigns[0].id,
    priority: 'high',
  },
  {
    id: nanoid(),
    title: 'Build oncology FAQ drip for WhatsApp',
    stage: 'Ideation',
    owner: 'Usha (CRM)',
    dueDate: formatISO(addDays(new Date(), 4)),
    campaignId: seedCampaigns[1].id,
    priority: 'medium',
  },
];

const seedSchedule: ScheduledPost[] = [
  {
    id: nanoid(),
    campaignId: seedCampaigns[0].id,
    channel: 'Instagram',
    format: 'Reel',
    contentTheme: 'Story of the week – heart wellness',
    caption: 'Every beat matters. Bharat Life Care’s preventive cardiology team helps your family stay ahead of risk.',
    scheduledAt: formatISO(addDays(new Date(), 1)),
    status: 'scheduled',
  },
  {
    id: nanoid(),
    campaignId: seedCampaigns[0].id,
    channel: 'Blog',
    format: 'Longform',
    contentTheme: 'Cardiac risk screening explainer',
    caption: 'Guide on complete cardiac screening protocols and early intervention practices.',
    scheduledAt: formatISO(addDays(new Date(), 2)),
    status: 'draft',
  },
  {
    id: nanoid(),
    campaignId: seedCampaigns[1].id,
    channel: 'YouTube',
    format: 'Longform',
    contentTheme: 'Tumour board walkthrough',
    caption: 'Behind the scenes on Bharat Life Care’s oncology tumour board coordination.',
    scheduledAt: formatISO(addDays(new Date(), 5)),
    status: 'scheduled',
  },
];

const seedMetrics: MetricSnapshot[] = [
  {
    id: nanoid(),
    channel: 'Instagram',
    engagementRate: 5.4,
    followerDelta: 312,
    conversions: 46,
    spend: 21000,
    roas: 3.4,
    sentiment: 'positive',
  },
  {
    id: nanoid(),
    channel: 'LinkedIn',
    engagementRate: 3.1,
    followerDelta: 140,
    conversions: 18,
    spend: 8000,
    roas: 4.1,
    sentiment: 'positive',
  },
  {
    id: nanoid(),
    channel: 'Facebook',
    engagementRate: 2.8,
    followerDelta: 220,
    conversions: 35,
    spend: 15000,
    roas: 2.9,
    sentiment: 'neutral',
  },
];

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  campaigns: seedCampaigns,
  tasks: seedTasks,
  scheduledPosts: seedSchedule,
  metrics: seedMetrics,
  assistantThread: [
    {
      id: nanoid(),
      role: 'assistant',
      content:
        'Namaste! I am the Bharat Life Care social media steward. I have already synced your key campaigns, cadences, and approvals. Ask for ideas, scheduling support, or campaign intelligence anytime.',
      timestamp: new Date().toISOString(),
    },
  ],
  preferences: {
    tone: 'warm',
    focusArea: 'preventive',
    audience: 'families',
    keywords: ['HeartHealth', 'PreventiveCare', 'BharatLifeCare'],
    channels: ['Instagram', 'LinkedIn', 'WhatsApp'],
  },
  ideaBank: [],
  addCampaign: (payload) =>
    set((state) => ({
      campaigns: [...state.campaigns, { id: nanoid(), ...payload }],
    })),
  addTask: (payload) =>
    set((state) => ({
      tasks: [...state.tasks, { id: nanoid(), ...payload }],
    })),
  advanceTask: (id, stage) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, stage } : task)),
    })),
  updatePostStatus: (id, status) =>
    set((state) => ({
      scheduledPosts: state.scheduledPosts.map((post) =>
        post.id === id ? { ...post, status } : post,
      ),
    })),
  schedulePost: (payload) =>
    set((state) => ({
      scheduledPosts: [
        ...state.scheduledPosts,
        {
          id: nanoid(),
          ...payload,
        },
      ],
    })),
  pushAssistantMessage: (content) => {
    const state = get();
    const userMessage: AssistantMessage = {
      id: nanoid(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    const reply = generateAssistantResponse([...state.assistantThread, userMessage], {
      campaigns: state.campaigns,
      tasks: state.tasks,
      schedule: state.scheduledPosts,
      metrics: state.metrics,
    });

    set({ assistantThread: [...state.assistantThread, userMessage, reply] });
  },
  refreshAssistant: () => {
    const state = get();
    const reply = generateAssistantResponse(state.assistantThread, {
      campaigns: state.campaigns,
      tasks: state.tasks,
      schedule: state.scheduledPosts,
      metrics: state.metrics,
    });

    set({ assistantThread: [...state.assistantThread, reply] });
  },
  regenerateIdeas: () => {
    const state = get();
    const primaryCampaign = state.campaigns.find((c) => c.status !== 'completed') ?? state.campaigns[0];
    if (!primaryCampaign) {
      set({ ideaBank: [] });
      return;
    }

    const ideas = generateContentIdeas({
      campaign: primaryCampaign,
      tone: state.preferences.tone,
      focusArea: state.preferences.focusArea,
      audience: state.preferences.audience,
      keywords: state.preferences.keywords,
      channels: state.preferences.channels,
    });

    set({ ideaBank: ideas });
  },
  updatePreferences: (partial) =>
    set((state) => ({
      preferences: { ...state.preferences, ...partial },
    })),
}));
