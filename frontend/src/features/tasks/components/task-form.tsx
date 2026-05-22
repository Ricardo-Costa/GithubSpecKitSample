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
    <form onSubmit={handleSubmit} className="tm-card mb-4" noValidate>
      <h3 className="mb-4 text-lg font-semibold">Criar tarefa</h3>

      <div className="mb-3">
        <label className="tm-label" htmlFor="tf-title">Título</label>
        <input
          id="tf-title"
          className="tm-input"
          placeholder="Título da tarefa"
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
        />
        {errors.title ? <span className="tm-error">{errors.title}</span> : null}
      </div>

      <div className="mb-3">
        <label className="tm-label" htmlFor="tf-desc">Descrição</label>
        <textarea
          id="tf-desc"
          className="tm-textarea"
          placeholder="Descreva a tarefa..."
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
        />
      </div>

      <div className="mb-3">
        <label className="tm-label" htmlFor="tf-date">Data prevista de conclusão</label>
        <input
          id="tf-date"
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

      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="tm-label" htmlFor="tf-priority">Prioridade</label>
          <select
            id="tf-priority"
            className="tm-select"
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
          {errors.priority ? <span className="tm-error">{errors.priority}</span> : null}
        </div>

        <div>
          <label className="tm-label" htmlFor="tf-status">Status inicial</label>
          <select
            id="tf-status"
            className="tm-select"
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
          {errors.status ? <span className="tm-error">{errors.status}</span> : null}
        </div>
      </div>

      <button className="tm-button" type="submit" disabled={submitting}>
        {submitting ? 'Salvando...' : 'Salvar tarefa'}
      </button>
    </form>
  );
};
