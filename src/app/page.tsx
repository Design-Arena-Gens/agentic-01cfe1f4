import { AssistantPanel } from '@components/AssistantPanel';
import { CampaignPlanner } from '@components/CampaignPlanner';
import { ContentStudio } from '@components/ContentStudio';
import { InsightsRibbon } from '@components/InsightsRibbon';
import { MetricTiles } from '@components/MetricTiles';
import { ScheduleBoard } from '@components/ScheduleBoard';
import { TopBar } from '@components/TopBar';
import { WorkflowBoard } from '@components/WorkflowBoard';

export default function Home() {
  return (
    <div className="pb-16">
      <TopBar />
      <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-8 px-6">
        <InsightsRibbon />
        <MetricTiles />
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <CampaignPlanner />
          <AssistantPanel />
        </div>
        <ContentStudio />
        <ScheduleBoard />
        <WorkflowBoard />
      </div>
    </div>
  );
}
