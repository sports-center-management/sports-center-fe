import { createFileRoute } from '@tanstack/react-router';
import { Notifications } from '~/features/member';

export const Route = createFileRoute('/member/notifications')({
  component: Notifications,
});
