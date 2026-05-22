import type { CreateTaskInput, Task } from '../types/task.js';
import { TaskRepository } from '../repositories/task.repository.js';

export class CreateTaskService {
  constructor(private readonly repository: TaskRepository) {}

  execute(input: CreateTaskInput): Task {
    return this.repository.create(input);
  }
}
