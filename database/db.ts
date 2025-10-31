import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("expense.db");

export const createTable = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      amount REAL,
      createdAt TEXT,
      type TEXT,
      isDeleted INTEGER DEFAULT 0
    );
  `);
};
