import type { TaskDateType, TaskFilter, TaskPriority, TaskStatus } from '../../../types/task';

interface TaskFiltersProps {
  filters: TaskFilter;
  onChange: (changes: Partial<TaskFilter>) => void;
  onClear: () => void;
}

export const TaskFilters = ({ filters, onChange, onClear }: TaskFiltersProps) => (
  <section className="tm-card mb-4">
    <p className="mb-3 text-sm font-semibold">Filtros</p>
    <div className="flex flex-wrap gap-3 items-end">
      <div>
        <label className="tm-label" htmlFor="fi-priority">Prioridade</label>
        <select
          id="fi-priority"
          className="tm-select"
          style={{ width: 140 }}
          value={filters.priority ?? ''}
          onChange={(event) =>
            onChange({ priority: (event.target.value || undefined) as TaskPriority | undefined })
          }
        >
          <option value="">Todas</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
      </div>

      <div>
        <label className="tm-label" htmlFor="fi-status">Status</label>
        <select
          id="fi-status"
          className="tm-select"
          style={{ width: 150 }}
          value={filters.status ?? ''}
          onChange={(event) =>
            onChange({ status: (event.target.value || undefined) as TaskStatus | undefined })
          }
        >
          <option value="">Todos</option>
          <option value="pending">pending</option>
          <option value="in_progress">in_progress</option>
          <option value="completed">completed</option>
        </select>
      </div>

      <div>
        <label className="tm-label" htmlFor="fi-datetype">Tipo de data</label>
        <select
          id="fi-datetype"
          className="tm-select"
          style={{ width: 160 }}
          value={filters.dateType ?? ''}
          onChange={(event) =>
            onChange({ dateType: (event.target.value || undefined) as TaskDateType | undefined })
          }
        >
          <option value="">Selecione</option>
          <option value="prevista">data prevista</option>
          <option value="real">data real</option>
        </select>
      </div>

      <div>
        <label className="tm-label" htmlFor="fi-date">Data</label>
        <input
          id="fi-date"
          className="tm-input"
          style={{ width: 160 }}
          type="date"
          value={filters.date ?? ''}
          onChange={(event) => onChange({ date: event.target.value || undefined })}
        />
      </div>

      <div style={{ paddingBottom: 1 }}>
        <button className="tm-button-secondary" type="button" onClick={onClear}>
          Limpar filtros
        </button>
      </div>
    </div>
  </section>
);
