import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';

// Create database connection
const sqlite = SQLite.openDatabaseSync('history.db');

// Initialize drizzle with the database connection
export const db = drizzle(sqlite);

// Create tables if they don't exist
const tableName = 'history'; // Use string literal since table name property is not accessible
db.run(
  `CREATE TABLE IF NOT EXISTS ${tableName} (
    id TEXT PRIMARY KEY,
    product_name TEXT NOT NULL,
    bag_weight REAL NOT NULL,
    price_amount REAL NOT NULL,
    price_weight REAL NOT NULL,
    full_bags REAL NOT NULL,
    loose_weight REAL NOT NULL,
    wastage_amount REAL NOT NULL,
    wastage_reference_weight REAL NOT NULL,
    total_weight REAL NOT NULL,
    wastage REAL NOT NULL,
    net_weight REAL NOT NULL,
    total_amount REAL NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`
);
