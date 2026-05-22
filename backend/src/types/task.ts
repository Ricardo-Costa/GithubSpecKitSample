export const TASK_PRIORITIES = ['low', 'medium', 'high'] as const;
export const TASK_STATUSES = ['pending', 'in_progress', 'completed'] as const;
export const TASK_DATE_TYPES = ['prevista', 'real'] as const;

export type TaskPriority = (typeof TASK_PRIORITIES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskDateType = (typeof TASK_DATE_TYPES)[number];

export interface Task {
  id: number;
  title: string;
  description: string;
  dataPrevistaConclusao: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dataConclusaoReal: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilter {
  priority?: TaskPriority;
  status?: TaskStatus;
  date?: string;
  dateType?: TaskDateType;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dataPrevistaConclusao?: string | null;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  dataPrevistaConclusao?: string | null;
  priority?: TaskPriority;
  status?: TaskStatus;
}
