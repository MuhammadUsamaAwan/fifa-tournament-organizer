import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(web)/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello </div>;
}
