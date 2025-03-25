import { createFileRoute, Link, Outlet, useRouter } from '@tanstack/react-router';

import { authClient } from '~/lib/auth-client';
import { Logo } from '~/components/logo';
import { Button, buttonVariants } from '~/components/ui/button';

export const Route = createFileRoute('/(web)/_layout')({
  component: RouteComponent,
  loader: ({ context }) => context.session?.session,
});

function RouteComponent() {
  const session = Route.useLoaderData();
  const router = useRouter();

  return (
    <div>
      <header>
        <div className='container mx-auto flex h-14 items-center justify-between'>
          <Logo href='/' />
          {session ? (
            <Button
              variant='outline'
              onClick={() => {
                authClient.signOut().then(() => router.invalidate());
              }}
            >
              Logout
            </Button>
          ) : (
            <Link to='/login' className={buttonVariants({ variant: 'outline' })}>
              Login
            </Link>
          )}
        </div>
      </header>
      <Outlet />
    </div>
  );
}
