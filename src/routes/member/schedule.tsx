import { createFileRoute } from '@tanstack/react-router';
import { UpcomingClasses } from '~/features/member-dashboard/components/UpcomingClasses';

export const Route = createFileRoute('/member/schedule')({
  component: () => (
    <div style={{ maxWidth: '900px' }}>
      <UpcomingClasses />
    </div>
  ),
});
