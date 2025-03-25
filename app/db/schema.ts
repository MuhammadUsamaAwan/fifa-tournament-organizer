import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull(),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  role: text('role'),
  banned: integer('banned', { mode: 'boolean' }),
  banReason: text('ban_reason'),
  banExpires: integer('ban_expires', { mode: 'timestamp' }),
});

export const sessionsTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by'),
});

export const accountsTable = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const verificationsTable = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const playersTable = sqliteTable('player', {
  id: text('id')
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  address: text('address'),
});

export const tournamentsTable = sqliteTable('tournament', {
  id: text('id')
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  startTimestamp: integer('start_date', { mode: 'timestamp' }).notNull(),
});

export const matchesTable = sqliteTable(
  'match',
  {
    tournamentId: text('tournament_id')
      .notNull()
      .references(() => tournamentsTable.id, { onDelete: 'cascade' }),
    player1Id: text('player1_id')
      .notNull()
      .references(() => playersTable.id, { onDelete: 'set null' }),
    player2Id: text('player2_id')
      .notNull()
      .references(() => playersTable.id, { onDelete: 'set null' }),
    player1Team: text('player1_team'),
    player2Team: text('player2_team'),
    player1Score: integer('player1_score'),
    player2Score: integer('player2_score'),
    winnerId: text('winner_id').references(() => playersTable.id, { onDelete: 'set null' }),
    bracket: text('bracket', { enum: ['winners', 'losers'] }).notNull(),
    round: integer('round'),
    status: text('status', { enum: ['pending', 'in_progress', 'completed'] })
      .notNull()
      .default('pending'),
    startTimestamp: integer('start_date', { mode: 'timestamp' }).notNull(),
  },
  t => [primaryKey({ columns: [t.tournamentId, t.player1Id, t.player2Id] })]
);
