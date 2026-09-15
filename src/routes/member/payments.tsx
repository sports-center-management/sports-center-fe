import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/payments')({
  component: () => (
    <Page title="Lịch sử thanh toán">
      <p className="m-0 text-sm text-sc-muted">Các hóa đơn đã thanh toán tại trung tâm.</p>
    </Page>
  ),
});
