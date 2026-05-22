export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;
export const TASK_STATUSES = ['pending', 'in_progress', 'completed'] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  priority?: TaskPriority;
  status?: TaskStatus;
  date?: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dueDate?: string | null;
  priority?: TaskPriority;
  status?: TaskStatus;
}
