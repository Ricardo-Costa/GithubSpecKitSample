CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL CHECK (length(trim(title)) > 0),
  description TEXT NOT NULL DEFAULT '',
  data_prevista_conclusao TEXT,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed')),
  data_conclusao_real TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_data_prevista ON tasks(data_prevista_conclusao);
CREATE INDEX IF NOT EXISTS idx_tasks_data_real ON tasks(data_conclusao_real);
CREATE INDEX IF NOT EXISTS idx_tasks_status_priority_prevista ON tasks(status, priority, data_prevista_conclusao);
