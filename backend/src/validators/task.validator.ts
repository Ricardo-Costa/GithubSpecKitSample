import { z } from 'zod';
import { TASK_PRIORITIES, TASK_STATUSES } from '../types/task.js';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const optionalDate = z
  .string()
  .regex(dateRegex, 'date must use YYYY-MM-DD format')
  .nullable()
  .optional();

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim(),
  dueDate: optionalDate,
  priority: z.enum(TASK_PRIORITIES),
  status: z.enum(TASK_STATUSES)
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, 'title cannot be empty').optional(),
    description: z.string().trim().optional(),
    dueDate: optionalDate,
    priority: z.enum(TASK_PRIORITIES).optional(),
    status: z.enum(TASK_STATUSES).optional()
  })
  .refine((payload) => Object.keys(payload).length > 0, {
    message: 'at least one field is required'
  });

export const taskFilterSchema = z.object({
  priority: z.enum(TASK_PRIORITIES).optional(),
  status: z.enum(TASK_STATUSES).optional(),
  date: z.string().regex(dateRegex, 'date must use YYYY-MM-DD format').optional()
});

export const taskIdSchema = z.object({
  id: z.coerce.number().int().positive()
});
