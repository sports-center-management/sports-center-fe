import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/court-booking')({
  component: () => (
    <Page title="Đặt sân">
      <p className="m-0 text-sm text-sc-muted">
        Chọn môn thể thao (Cầu lông, Tennis, Bóng rổ, Futsal) và giữ lịch đặt sân theo giờ.
      </p>
    </Page>
  ),
});
