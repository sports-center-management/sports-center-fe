import { createFileRoute } from '@tanstack/react-router';
import { MemberLayout } from '~/components/layouts/MemberLayout';

export const Route = createFileRoute('/member')({
  component: MemberLayout,
});
