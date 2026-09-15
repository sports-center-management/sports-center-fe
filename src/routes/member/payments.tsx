import { createFileRoute } from '@tanstack/react-router';
import { RecentActivities } from '~/features/member-dashboard/components/RecentActivities';

export const Route = createFileRoute('/member/payments')({
  component: () => (
    <div style={{ maxWidth: '800px' }}>
      <RecentActivities />
    </div>
  ),
});
