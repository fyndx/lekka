import { sql } from 'drizzle-orm';
import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { randomUUID } from 'expo-crypto';

// Define the history table schema
export const historyTable = sqliteTable('history', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  // Product details
  productName: text('product_name').notNull(),
  bagWeight: real('bag_weight').notNull(),

  // Price details
  priceAmount: real('price_amount').notNull(),
  priceWeight: real('price_weight').notNull(),

  // Quantity details
  fullBags: real('full_bags').notNull(),
  looseWeight: real('loose_weight').notNull(),

  // Wastage details
  wastageAmount: real('wastage_amount').notNull(),
  wastageReferenceWeight: real('wastage_reference_weight').notNull(),

  // Calculated results
  totalWeight: real('total_weight').notNull(),
  wastage: real('wastage').notNull(),
  netWeight: real('net_weight').notNull(),
  totalAmount: real('total_amount').notNull(),

  // Metadata
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// Zod schemas for type safety
export const insertHistorySchema = createInsertSchema(historyTable);
export const selectHistorySchema = createSelectSchema(historyTable);

// TypeScript types
export type History = typeof historyTable.$inferSelect;
export type NewHistory = typeof historyTable.$inferInsert;

// Helper type for creating new records without id and createdAt
export type HistoryInput = Omit<NewHistory, 'id' | 'createdAt'>;
