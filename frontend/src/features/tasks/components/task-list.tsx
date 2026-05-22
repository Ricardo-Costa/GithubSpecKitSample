import type { Task, TaskStatus } from '../../../types/task';
import { TaskListEmptyState } from './task-list-empty-state';
import { TaskStatusSelect } from './task-status-select';

interface TaskListProps {
  tasks: Task[];
  onChangeStatus: (taskId: number, status: TaskStatus) => Promise<void>;
}

export const TaskList = ({ tasks, onChangeStatus }: TaskListProps) => {
  if (tasks.length === 0) {
    return <TaskListEmptyState />;
  }

  return (
    <ul
      style={{ listStyle: 'none', padding: 0, margin: 0 }}
      className="flex flex-col gap-3"
    >
      {tasks.map((task) => (
        <li key={task.id} className="tm-card">
          <h4 className="mb-1 text-base font-semibold">{task.title}</h4>
          {task.description ? (
            <p className="mb-3 text-sm tm-muted">{task.description}</p>
          ) : null}

          <div className="mb-3 flex flex-wrap gap-2">
            <span className="tm-badge">prioridade: {task.priority}</span>
            <span className="tm-badge">prevista: {task.dataPrevistaConclusao ?? '—'}</span>
            {task.dataConclusaoReal ? (
              <span className="tm-badge">concluída: {task.dataConclusaoReal.slice(0, 10)}</span>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="tm-label" style={{ marginBottom: 0 }}>
              Status:
            </span>
            <TaskStatusSelect task={task} onChangeStatus={onChangeStatus} />
          </div>
        </li>
      ))}
    </ul>
  );
};
