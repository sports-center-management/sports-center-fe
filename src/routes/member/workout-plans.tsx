import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/workout-plans')({
  component: () => (
    <Page title="Kế hoạch & bài tập">
      <p className="m-0 text-sm text-sc-muted">Kế hoạch tập luyện và bài tập về nhà HLV đã giao.</p>
    </Page>
  ),
});
