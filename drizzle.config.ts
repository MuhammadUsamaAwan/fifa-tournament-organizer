import { defineConfig } from 'drizzle-kit';

import { serverEnv } from '~/config/serverEnv';

export default defineConfig({
  out: './migrations',
  schema: './app/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: serverEnv.TURSO_DATABASE_URL,
    authToken: serverEnv.TURSO_AUTH_TOKEN,
  },
});
