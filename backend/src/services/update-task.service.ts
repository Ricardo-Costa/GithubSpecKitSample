import { TaskRepository } from '../repositories/task.repository.js';
import type { Task, UpdateTaskInput } from '../types/task.js';

export class UpdateTaskService {
  constructor(private readonly repository: TaskRepository) {}

  execute(taskId: number, input: UpdateTaskInput): Task | null {
    return this.repository.update(taskId, input);
  }
}
