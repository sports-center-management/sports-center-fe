import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return <div style={{ padding: 40 }}>ForgotPassword — đang phát triển</div>;
}
