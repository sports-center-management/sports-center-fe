import { createFileRoute } from '@tanstack/react-router';
import { AiChat } from '~/features/member';

export const Route = createFileRoute('/member/ai-assistant')({
  component: AiChat,
});
