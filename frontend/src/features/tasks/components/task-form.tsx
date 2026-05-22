import { useState } from 'react';
import { TASK_PRIORITIES, TASK_STATUSES, type CreateTaskPayload } from '../../../types/task';
import { type TaskFormErrors, validateTaskForm } from '../utils/task-form-validation';

interface TaskFormProps {
  onCreate: (payload: CreateTaskPayload) => Promise<void>;
}

const initialForm: CreateTaskPayload = {
  title: '',
  description: '',
  dataPrevistaConclusao: null,
  priority: 'medium',
  status: 'pending'
};

export const TaskForm = ({ onCreate }: TaskFormProps) => {
  const [form, setForm] = useState<CreateTaskPayload>(initialForm);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateTaskForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await onCreate({
        ...form,
        dataPrevistaConclusao: form.dataPrevistaConclusao || null
      });
      setForm(initialForm);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
      <h3>Criar tarefa</h3>
      <input
        placeholder="Título"
        value={form.title}
        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
      />
      {errors.title ? <small style={{ color: 'crimson' }}>{errors.title}</small> : null}

      <textarea
        placeholder="Descrição"
        value={form.description}
        onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
      />

      <input
        type="date"
        value={form.dataPrevistaConclusao ?? ''}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            dataPrevistaConclusao: event.target.value || null
          }))
        }
      />
      {errors.dataPrevistaConclusao ? <small style={{ color: 'crimson' }}>{errors.dataPrevistaConclusao}</small> : null}

      <select
        value={form.priority}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            priority: event.target.value as CreateTaskPayload['priority']
          }))
        }
      >
        {TASK_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      {errors.priority ? <small style={{ color: 'crimson' }}>{errors.priority}</small> : null}

      <select
        value={form.status}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            status: event.target.value as CreateTaskPayload['status']
          }))
        }
      >
        {TASK_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {errors.status ? <small style={{ color: 'crimson' }}>{errors.status}</small> : null}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Salvando...' : 'Salvar tarefa'}
      </button>
    </form>
  );
};
