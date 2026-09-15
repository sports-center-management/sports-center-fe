import { createFileRoute } from '@tanstack/react-router';
import { MemberLayout } from '~/features/member';

export const Route = createFileRoute('/member')({
  component: MemberLayout,
});
