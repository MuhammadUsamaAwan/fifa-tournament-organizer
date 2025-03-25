import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { auth } from '~/lib/auth';

export const getUserByEmail = createServerFn()
  .validator(
    z.object({
      email: z.string().email(),
    })
  )
  .handler(async ({ data }) => {
    const [user] = await db
      .select({
        id: usersTable.id,
      })
      .from(usersTable)
      .where(and(eq(usersTable.email, data.email), eq(usersTable.emailVerified, false)));
    return user;
  });

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
