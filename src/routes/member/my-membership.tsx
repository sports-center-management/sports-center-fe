import { createFileRoute } from '@tanstack/react-router';
import { CurrentMembershipCard } from '~/features/member-dashboard/components/CurrentMembershipCard';

export const Route = createFileRoute('/member/my-membership')({
  component: () => (
    <div style={{ maxWidth: '700px' }}>
      <CurrentMembershipCard />
    </div>
  ),
});
