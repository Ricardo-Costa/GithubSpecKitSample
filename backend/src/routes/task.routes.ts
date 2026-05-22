import { Router } from 'express';
import { TaskController } from '../controllers/task.controller.js';
import { CreateTaskService } from '../services/create-task.service.js';
import { ListTasksService } from '../services/list-tasks.service.js';
import { UpdateTaskStatusService } from '../services/update-task-status.service.js';
import { TaskRepository } from '../repositories/task.repository.js';

const taskRepository = new TaskRepository();
const createTaskService = new CreateTaskService(taskRepository);
const listTasksService = new ListTasksService(taskRepository);
const updateTaskStatusService = new UpdateTaskStatusService(taskRepository);

const taskController = new TaskController(
  createTaskService,
  listTasksService,
  updateTaskStatusService,
  taskRepository
);

export const taskRouter = Router();

taskRouter.get('/', taskController.list);
taskRouter.post('/', taskController.create);
taskRouter.get('/:id', taskController.getById);
taskRouter.patch('/:id', taskController.update);
taskRouter.delete('/:id', taskController.remove);
