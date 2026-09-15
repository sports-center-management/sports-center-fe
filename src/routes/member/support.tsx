import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/support')({
  component: () => (
    <Page title="Yêu cầu hỗ trợ">
      <p className="m-0 text-sm text-sc-muted">Gửi yêu cầu và theo dõi phản hồi từ trung tâm.</p>
    </Page>
  ),
});
