import { desc } from 'drizzle-orm';
import { create } from 'zustand';

import { db } from './db';
import { type History, type HistoryInput, historyTable } from './schema';

interface HistoryState {
  addHistoryRecord: (record: HistoryInput) => Promise<void>;
  getHistoryRecords: () => Promise<History[]>;
}

export const useHistory = create<HistoryState>()(() => ({
  addHistoryRecord: async (record) => {
    try {
      await db.insert(historyTable).values(record);
    } catch (error) {
      console.error('Error adding history record:', error);
      throw error;
    }
  },

  getHistoryRecords: async () => {
    try {
      return await db
        .select()
        .from(historyTable)
        .orderBy(desc(historyTable.createdAt));
    } catch (error) {
      console.error('Error fetching history records:', error);
      return [];
    }
  },
}));
