import type { Task, TaskFilter } from '../types/task.js';
import { TaskRepository } from '../repositories/task.repository.js';

export class ListTasksService {
  constructor(private readonly repository: TaskRepository) {}

  execute(filters: TaskFilter): Task[] {
    return this.repository.list(filters);
  }
}
