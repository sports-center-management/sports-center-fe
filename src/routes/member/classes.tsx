import { createFileRoute } from '@tanstack/react-router';
import { Page } from '~/features/member';

export const Route = createFileRoute('/member/classes')({
  component: () => (
    <Page title="Lớp học">
      <p className="m-0 text-sm text-sc-muted">Các lớp Yoga, Gym, Pilates, Boxing và Bơi lội đang mở đăng ký.</p>
    </Page>
  ),
});
