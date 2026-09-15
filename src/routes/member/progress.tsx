import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/progress')({
  component: () => (
    <Page title="Kết quả & tiến độ">
      <p className="m-0 text-sm text-sc-muted">Kết quả từng buổi tập và đánh giá tiến độ của HLV.</p>
    </Page>
  ),
});
