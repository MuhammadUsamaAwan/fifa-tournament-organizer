import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

import { siteConfig } from '~/config/site';
import { getSession } from '~/server/auth';
import { Toaster } from '~/components/ui/sonner';
import globalCss from '~/styles/global.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteConfig.name,
      },
      {
        name: 'description',
        content: `${siteConfig.name} - Fifa Tournament Organizer`,
      },
    ],
    links: [
      { rel: 'stylesheet', href: globalCss },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    ],
  }),
  component: RootComponent,
  beforeLoad: async () => {
    const session = await getSession();
    return { session };
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
