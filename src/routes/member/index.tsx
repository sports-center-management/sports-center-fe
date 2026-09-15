import { createFileRoute } from '@tanstack/react-router';
import { MemberDashboard } from '~/features/member-dashboard';

export const Route = createFileRoute('/member/')({
  component: MemberDashboard,
});
