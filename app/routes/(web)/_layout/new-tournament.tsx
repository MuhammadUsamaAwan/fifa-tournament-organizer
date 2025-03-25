import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(web)/_layout/new-tournament')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello new tournament</div>;
}
