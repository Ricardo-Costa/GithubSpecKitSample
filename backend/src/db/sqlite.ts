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

export const initializeDatabase = (): void => {
  const schemaPath = path.resolve(process.cwd(), '..', 'database', 'schema.sql');
  const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
  db.exec(schemaSql);
};
