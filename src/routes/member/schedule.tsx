import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/schedule')({
  component: () => (
    <Page title="Lịch tập của tôi">
      <p className="m-0 text-sm text-sc-muted">Lịch lớp học và đặt sân theo tuần.</p>
    </Page>
  ),
});
