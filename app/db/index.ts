import { drizzle } from 'drizzle-orm/libsql/web';

import { serverEnv } from '~/config/serverEnv';

export const db = drizzle({
  connection: {
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
});
