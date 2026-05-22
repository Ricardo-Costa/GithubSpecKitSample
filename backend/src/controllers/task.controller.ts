import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../middlewares/error-handler.js';
import { createTaskSchema, taskFilterSchema, taskIdSchema, updateTaskSchema } from '../validators/task.validator.js';
import { CreateTaskService } from '../services/create-task.service.js';
import { ListTasksService } from '../services/list-tasks.service.js';
import { UpdateTaskStatusService } from '../services/update-task-status.service.js';
import { UpdateTaskService } from '../services/update-task.service.js';
import { TaskRepository } from '../repositories/task.repository.js';

export class TaskController {
  constructor(
    private readonly createTaskService: CreateTaskService,
    private readonly listTasksService: ListTasksService,
    private readonly updateTaskStatusService: UpdateTaskStatusService,
    private readonly updateTaskService: UpdateTaskService,
    private readonly repository: TaskRepository
  ) {}

  create = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const payload = createTaskSchema.parse(request.body);
      const task = this.createTaskService.execute(payload);
      response.status(201).json(task);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'Invalid request payload', error.issues.map((issue) => issue.message)));
        return;
      }
      next(error);
    }
  };

  list = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const filters = taskFilterSchema.parse(request.query);
      const tasks = this.listTasksService.execute(filters);
      response.status(200).json({ items: tasks });
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'Invalid filter values', error.issues.map((issue) => issue.message)));
        return;
      }
      next(error);
    }
  };

  getById = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const { id } = taskIdSchema.parse(request.params);
      const task = this.repository.findById(id);

      if (!task) {
        next(new AppError(404, 'Task not found'));
        return;
      }

      response.status(200).json(task);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'Invalid task id', error.issues.map((issue) => issue.message)));
        return;
      }
      next(error);
    }
  };

  update = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const { id } = taskIdSchema.parse(request.params);
      const payload = updateTaskSchema.parse(request.body);
      const updatedTask =
        Object.keys(payload).length === 1 && payload.status
          ? this.updateTaskStatusService.execute(id, payload.status)
          : this.updateTaskService.execute(id, payload);

      if (!updatedTask) {
        next(new AppError(404, 'Task not found'));
        return;
      }

      response.status(200).json(updatedTask);
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'Invalid update payload', error.issues.map((issue) => issue.message)));
        return;
      }
      next(error);
    }
  };

  remove = (request: Request, response: Response, next: NextFunction): void => {
    try {
      const { id } = taskIdSchema.parse(request.params);
      const deleted = this.repository.delete(id);

      if (!deleted) {
        next(new AppError(404, 'Task not found'));
        return;
      }

      response.status(204).send();
    } catch (error) {
      if (error instanceof ZodError) {
        next(new AppError(400, 'Invalid task id', error.issues.map((issue) => issue.message)));
        return;
      }
      next(error);
    }
  };
}
