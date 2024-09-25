import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
  transaction_id: uuid('transaction_id').primaryKey().defaultRandom(),
  account_id: uuid('account_id').notNull(),
  amount: integer('amount').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const accounts = pgTable('accounts', {
  account_id: uuid('account_id').primaryKey(),
  balance: integer('balance').default(0).notNull(),
});
