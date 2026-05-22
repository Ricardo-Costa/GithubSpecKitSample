import { request } from '../../../services/http-client';
import type { CreateTaskPayload, Task, TaskFilter, TaskStatus } from '../../../types/task';

interface ListTasksResponse {
  items: Task[];
}

const toQueryString = (filter: TaskFilter): string => {
  const params = new URLSearchParams();

  if (filter.priority) {
    params.set('priority', filter.priority);
  }

  if (filter.status) {
    params.set('status', filter.status);
  }

  if (filter.date) {
    params.set('date', filter.date);
  }

  const query = params.toString();
  return query ? `?${query}` : '';
};

export const listTasks = async (filters: TaskFilter): Promise<Task[]> => {
  const response = await request<ListTasksResponse>(`/tasks${toQueryString(filters)}`);
  return response.items;
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> =>
  request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const updateTaskStatus = async (taskId: number, status: TaskStatus): Promise<Task> =>
  request<Task>(`/tasks/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
