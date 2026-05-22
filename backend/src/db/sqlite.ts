import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { env } from '../config/env.js';

const databasePath = path.resolve(process.cwd(), env.databasePath);
const databaseDir = path.dirname(databasePath);

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

export const db = new DatabaseSync(databasePath);
db.exec('PRAGMA journal_mode = WAL;');

const migrateLegacyTaskColumns = (): void => {
  const columns = db
    .prepare("PRAGMA table_info('tasks')")
    .all() as Array<{ name: string }>;

  const columnNames = new Set(columns.map((column) => column.name));

  if (columnNames.has('due_date') && !columnNames.has('data_prevista_conclusao')) {
    db.exec("ALTER TABLE tasks ADD COLUMN data_prevista_conclusao TEXT");
    db.exec('UPDATE tasks SET data_prevista_conclusao = due_date WHERE data_prevista_conclusao IS NULL');
  }

  if (columnNames.has('completed_at') && !columnNames.has('data_conclusao_real')) {
    db.exec("ALTER TABLE tasks ADD COLUMN data_conclusao_real TEXT");
    db.exec('UPDATE tasks SET data_conclusao_real = completed_at WHERE data_conclusao_real IS NULL');
  }
};

export const initializeDatabase = (): void => {
  const schemaPath = path.resolve(process.cwd(), '..', 'database', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schemaSql);
  migrateLegacyTaskColumns();
};
