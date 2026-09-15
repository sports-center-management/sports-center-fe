import { createFileRoute } from '@tanstack/react-router';
import { CheckIn } from '~/features/member';

export const Route = createFileRoute('/member/checkin')({
  component: CheckIn,
});
