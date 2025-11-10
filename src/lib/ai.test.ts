import { describe, expect, it } from 'vitest';
import { generateContentIdeas } from './ai';

const campaign = {
  id: '1',
  name: 'Test Campaign',
  objective: 'Drive engagement',
  summary: 'Sample summary',
  startDate: new Date().toISOString(),
  endDate: new Date().toISOString(),
  status: 'planning' as const,
  priority: 'high' as const,
  channels: ['Instagram', 'LinkedIn'] as const,
  heroMetric: 'Leads',
};

describe('generateContentIdeas', () => {
  it('returns three structured ideas with hashtags', () => {
    const ideas = generateContentIdeas({
      campaign,
      tone: 'warm',
      focusArea: 'preventive',
      audience: 'families',
      keywords: ['HeartHealth'],
      channels: ['Instagram', 'LinkedIn'],
    });

    expect(ideas).toHaveLength(3);
    ideas.forEach((idea) => {
      expect(idea.headline.length).toBeGreaterThan(0);
      expect(Array.isArray(idea.hashtags)).toBe(true);
      expect(idea.hashtags.length).toBeGreaterThan(0);
    });
  });
});
