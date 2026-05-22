import type { TaskFilter, TaskPriority, TaskStatus, TaskDateType } from '../../../types/task';

interface TaskFiltersProps {
  filters: TaskFilter;
  onChange: (changes: Partial<TaskFilter>) => void;
  onClear: () => void;
}

export const TaskFilters = ({ filters, onChange, onClear }: TaskFiltersProps) => (
  <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
    <select
      value={filters.priority ?? ''}
      onChange={(event) =>
        onChange({ priority: (event.target.value || undefined) as TaskPriority | undefined })
      }
    >
      <option value="">Todas prioridades</option>
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>

    <select
      value={filters.status ?? ''}
      onChange={(event) =>
        onChange({ status: (event.target.value || undefined) as TaskStatus | undefined })
      }
    >
      <option value="">Todos status</option>
      <option value="pending">pending</option>
      <option value="in_progress">in_progress</option>
      <option value="completed">completed</option>
    </select>

    <select
      value={filters.dateType ?? ''}
      onChange={(event) =>
        onChange({ dateType: (event.target.value || undefined) as TaskDateType | undefined })
      }
    >
      <option value="">Tipo de data</option>
      <option value="prevista">data prevista</option>
      <option value="real">data conclusão real</option>
    </select>

    <input
      type="date"
      value={filters.date ?? ''}
      onChange={(event) => onChange({ date: event.target.value || undefined })}
    />

    <button type="button" onClick={onClear}>
      Limpar filtros
    </button>
  </div>
);
