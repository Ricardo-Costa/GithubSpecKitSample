import { useState } from 'react';
import { TASK_PRIORITIES, type TaskPriority, type UpdateTaskPayload } from '../../../types/task';
import { type TaskFormErrors, validateTaskForm } from '../utils/task-form-validation';

interface TaskEditFormProps {
  title?: string;
  description?: string;
  dataPrevistaConclusao?: string | null;
  priority?: TaskPriority;
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
      priority: form.priority,
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
      if (form.dataPrevistaConclusao !== initialDate) {
        payload.dataPrevistaConclusao = form.dataPrevistaConclusao;
      }
      if (form.priority !== initialPriority) payload.priority = form.priority;

      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tm-card mb-4" noValidate>
      <h3 className="mb-4 text-lg font-semibold">Editar tarefa</h3>

      <div className="mb-3">
        <label className="tm-label" htmlFor="ef-title">Título</label>
        <input
          id="ef-title"
          className="tm-input"
          placeholder="Título"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        {errors.title ? <span className="tm-error">{errors.title}</span> : null}
      </div>

      <div className="mb-3">
        <label className="tm-label" htmlFor="ef-desc">Descrição</label>
        <textarea
          id="ef-desc"
          className="tm-textarea"
          placeholder="Descrição"
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
      </div>

      <div className="mb-3">
        <label className="tm-label" htmlFor="ef-date">Data prevista de conclusão</label>
        <input
          id="ef-date"
          className="tm-input"
          type="date"
          value={form.dataPrevistaConclusao ?? ''}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              dataPrevistaConclusao: event.target.value || null
            }))
          }
        />
        {errors.dataPrevistaConclusao ? <span className="tm-error">{errors.dataPrevistaConclusao}</span> : null}
      </div>

      <div className="mb-4">
        <label className="tm-label" htmlFor="ef-priority">Prioridade</label>
        <select
          id="ef-priority"
          className="tm-select"
          value={form.priority}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              priority: event.target.value as TaskPriority
            }))
          }
        >
          {TASK_PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        {errors.priority ? <span className="tm-error">{errors.priority}</span> : null}
      </div>

      <div className="flex gap-2">
        <button className="tm-button" type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : 'Salvar'}
        </button>
        <button className="tm-button-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};
