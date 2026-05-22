import { useState } from 'react';
import { TASK_PRIORITIES, type UpdateTaskPayload } from '../../../types/task';
import { type TaskFormErrors, validateTaskForm } from '../utils/task-form-validation';

interface TaskEditFormProps {
  title?: string;
  description?: string;
  dataPrevistaConclusao?: string | null;
  priority?: string;
  onSubmit: (payload: UpdateTaskPayload) => Promise<void>;
  onCancel: () => void;
}

export const TaskEditForm = ({
  title: initialTitle = '',
  description: initialDescription = '',
  dataPrevistaConclusao: initialDate = null,
  priority: initialPriority = 'medium',
  onSubmit,
  onCancel
}: TaskEditFormProps) => {
  const [form, setForm] = useState({
    title: initialTitle,
    description: initialDescription,
    dataPrevistaConclusao: initialDate,
    priority: initialPriority
  });
  const [errors, setErrors] = useState<TaskFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateTaskForm({
      title: form.title,
      description: form.description,
      dataPrevistaConclusao: form.dataPrevistaConclusao,
      priority: form.priority as any,
      status: 'pending'
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const payload: UpdateTaskPayload = {};
      if (form.title !== initialTitle) payload.title = form.title;
      if (form.description !== initialDescription) payload.description = form.description;
      if (form.dataPrevistaConclusao !== initialDate)
        payload.dataPrevistaConclusao = form.dataPrevistaConclusao;
      if (form.priority !== initialPriority) payload.priority = form.priority as any;

      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
      <h3>Editar tarefa</h3>
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
      {errors.dataPrevistaConclusao ? (
        <small style={{ color: 'crimson' }}>{errors.dataPrevistaConclusao}</small>
      ) : null}

      <select
        value={form.priority}
        onChange={(event) =>
          setForm((prev) => ({
            ...prev,
            priority: event.target.value
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

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};
