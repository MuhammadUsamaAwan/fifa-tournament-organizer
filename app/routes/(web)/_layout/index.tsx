import { createFileRoute, Link } from '@tanstack/react-router';

import { buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/(web)/_layout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-semibold'>Tournaments</h1>
        <Link to='/new-tournament' className={buttonVariants()}>
          New
        </Link>
      </div>
    </>
  );
}
