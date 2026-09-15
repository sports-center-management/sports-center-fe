import { createFileRoute } from '@tanstack/react-router';
import { MemberHome } from '~/features/member';

export const Route = createFileRoute('/member/')({
  component: MemberHome,
});
