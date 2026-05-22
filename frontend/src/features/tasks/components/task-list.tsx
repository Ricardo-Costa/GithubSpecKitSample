import type { Task, TaskStatus } from '../../../types/task';
import { TaskStatusSelect } from './task-status-select';
import { TaskListEmptyState } from './task-list-empty-state';

interface TaskListProps {
  tasks: Task[];
  onChangeStatus: (taskId: number, status: TaskStatus) => Promise<void>;
}

export const TaskList = ({ tasks, onChangeStatus }: TaskListProps) => {
  if (tasks.length === 0) {
    return <TaskListEmptyState />;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
      {tasks.map((task) => (
        <li key={task.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
          <h4 style={{ margin: '0 0 6px 0' }}>{task.title}</h4>
          <p style={{ margin: '0 0 6px 0' }}>{task.description}</p>
          <small style={{ display: 'block' }}>prioridade: {task.priority}</small>
          <small style={{ display: 'block' }}>data prevista: {task.dataPrevistaConclusao ?? 'não definida'}</small>
          {task.dataConclusaoReal && (
            <small style={{ display: 'block' }}>data conclusão: {task.dataConclusaoReal}</small>
          )}
          <div style={{ marginTop: 8 }}>
            <TaskStatusSelect task={task} onChangeStatus={onChangeStatus} />
          </div>
        </li>
      ))}
    </ul>
  );
};
