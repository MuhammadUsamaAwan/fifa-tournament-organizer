import { z } from 'zod';

const serverEnvSchema = z.object({
  TURSO_DATABASE_URL: z.string().min(1),
  TURSO_AUTH_TOKEN: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.string().min(1),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

export let serverEnv: ServerEnv;

try {
  serverEnv = serverEnvSchema.parse(process.env);
} catch (error) {
  console.error('❌ Invalid server env:', error);
  process.exit(1);
}
