import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/my-membership')({
  component: () => (
    <Page title="Gói của tôi">
      <p className="m-0 text-sm text-sc-muted">Thông tin gói thành viên hiện tại và lịch sử gia hạn.</p>
    </Page>
  ),
});
