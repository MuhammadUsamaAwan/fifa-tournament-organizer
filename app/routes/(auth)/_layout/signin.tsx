import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(auth)/_layout/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Signin</div>;
}
