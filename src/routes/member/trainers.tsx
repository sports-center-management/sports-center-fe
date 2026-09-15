import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/trainers')({
  component: () => (
    <Page title="Huấn luyện viên">
      <p className="m-0 text-sm text-sc-muted">Danh sách huấn luyện viên phụ trách các lớp bạn đang học.</p>
    </Page>
  ),
});
