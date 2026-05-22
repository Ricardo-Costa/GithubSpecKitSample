import { TaskRepository } from '../repositories/task.repository.js';
import type { Task, TaskStatus } from '../types/task.js';

export class UpdateTaskStatusService {
  constructor(private readonly repository: TaskRepository) {}

  execute(taskId: number, status: TaskStatus): Task | null {
    return this.repository.update(taskId, { status });
  }
}
