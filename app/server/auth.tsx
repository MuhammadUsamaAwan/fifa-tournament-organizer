import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { auth } from '~/lib/auth';

export const getSession = createServerFn().handler(async () => {
  const headersObject = getRequestHeaders();
  const headers = new Headers();
  Object.entries(headersObject).forEach(([key, value]) => {
    if (value !== undefined) {
      headers.append(key, value);
    }
  });
  const session = await auth.api.getSession({
    headers,
  });
  return session;
});
