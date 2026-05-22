import type { CreateTaskPayload } from '../../../types/task';

export interface TaskFormErrors {
  title?: string;
  priority?: string;
  status?: string;
  dataPrevistaConclusao?: string;
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const validateTaskForm = (payload: CreateTaskPayload): TaskFormErrors => {
  const errors: TaskFormErrors = {};

  if (!payload.title.trim()) {
    errors.title = 'Título é obrigatório.';
  }

  if (!payload.priority) {
    errors.priority = 'Prioridade é obrigatória.';
  }

  if (!payload.status) {
    errors.status = 'Status é obrigatório.';
  }

  if (payload.dataPrevistaConclusao && !dateRegex.test(payload.dataPrevistaConclusao)) {
    errors.dataPrevistaConclusao = 'Data deve estar no formato YYYY-MM-DD.';
  }

  return errors;
};
