export type Channel =
  | 'Instagram'
  | 'Facebook'
  | 'LinkedIn'
  | 'YouTube'
  | 'WhatsApp'
  | 'X'
  | 'Blog';

export type WorkflowStage =
  | 'Ideation'
  | 'Drafting'
  | 'Review'
  | 'Approval'
  | 'Scheduled'
  | 'Published';

export interface Campaign {
  id: string;
  name: string;
  objective: string;
  summary: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'live' | 'completed';
  priority: 'high' | 'medium' | 'low';
  channels: Channel[];
  heroMetric: string;
}

export interface Task {
  id: string;
  title: string;
  stage: WorkflowStage;
  owner: string;
  dueDate: string;
  campaignId: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  notes?: string;
}

export interface ScheduledPost {
  id: string;
  campaignId: string;
  channel: Channel;
  format: 'Reel' | 'Story' | 'Static' | 'Carousel' | 'Longform' | 'Short';
  contentTheme: string;
  caption: string;
  scheduledAt: string;
  status: 'scheduled' | 'draft' | 'published';
}

export interface MetricSnapshot {
  id: string;
  channel: Channel;
  engagementRate: number;
  followerDelta: number;
  conversions: number;
  spend: number;
  roas: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ContentIdea {
  id: string;
  headline: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  recommendedChannels: Channel[];
}

export interface CadencePreset {
  id: string;
  title: string;
  description: string;
  cadence: Record<Channel, number>;
}
