import { createFileRoute } from '@tanstack/react-router';
import { Profile } from '~/features/member';

export const Route = createFileRoute('/member/profile')({
  component: Profile,
});
