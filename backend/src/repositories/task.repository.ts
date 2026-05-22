import { db } from '../db/sqlite.js';
import type { CreateTaskInput, Task, TaskFilter, UpdateTaskInput } from '../types/task.js';

interface TaskRow {
  id: number;
  title: string;
  description: string;
  due_date: string | null;
  priority: Task['priority'];
  status: Task['status'];
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

const mapTaskRow = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  description: row.description,
  dueDate: row.due_date,
  priority: row.priority,
  status: row.status,
  completedAt: row.completed_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export class TaskRepository {
  create(input: CreateTaskInput): Task {
    const statement = db.prepare(
      `INSERT INTO tasks (title, description, due_date, priority, status, completed_at)
       VALUES (@title, @description, @dueDate, @priority, @status,
         CASE WHEN @status = 'completed' THEN datetime('now') ELSE NULL END)`
    );

    const result = statement.run({
      title: input.title,
      description: input.description,
      dueDate: input.dueDate ?? null,
      priority: input.priority,
      status: input.status
    });

    return this.findById(Number(result.lastInsertRowid)) as Task;
  }

  list(filters: TaskFilter = {}): Task[] {
    const clauses: string[] = [];
    const params: Record<string, string> = {};

    if (filters.priority) {
      clauses.push('priority = @priority');
      params.priority = filters.priority;
    }

    if (filters.status) {
      clauses.push('status = @status');
      params.status = filters.status;
    }

    if (filters.date) {
      clauses.push('due_date = @date');
      params.date = filters.date;
    }

    const whereClause = clauses.length > 0 ? `WHERE ${clauses.join(' AND ')}` : '';
    const query = `SELECT * FROM tasks ${whereClause} ORDER BY created_at DESC`;

    const rows = db.prepare(query).all(params) as unknown as TaskRow[];
    return rows.map(mapTaskRow);
  }

  findById(id: number): Task | null {
    const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as TaskRow | undefined;
    return row ? mapTaskRow(row) : null;
  }

  update(id: number, input: UpdateTaskInput): Task | null {
    const updates: string[] = [];
    const params: Record<string, string | number | null> = { id };

    if (input.title !== undefined) {
      updates.push('title = @title');
      params.title = input.title;
    }

    if (input.description !== undefined) {
      updates.push('description = @description');
      params.description = input.description;
    }

    if (input.dueDate !== undefined) {
      updates.push('due_date = @dueDate');
      params.dueDate = input.dueDate;
    }

    if (input.priority !== undefined) {
      updates.push('priority = @priority');
      params.priority = input.priority;
    }

    if (input.status !== undefined) {
      updates.push('status = @status');
      params.status = input.status;
      updates.push(`completed_at = CASE WHEN @status = 'completed' THEN datetime('now') ELSE NULL END`);
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    updates.push("updated_at = datetime('now')");

    const query = `UPDATE tasks SET ${updates.join(', ')} WHERE id = @id`;
    const result = db.prepare(query).run(params);

    if (result.changes === 0) {
      return null;
    }

    return this.findById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
    return result.changes > 0;
  }
}
