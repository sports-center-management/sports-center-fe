import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/membership-plans')({
  component: () => (
    <Page title="Gói thành viên">
      <p className="m-0 text-sm text-sc-muted">Danh sách các gói thẻ tập đang phát hành.</p>
    </Page>
  ),
});
