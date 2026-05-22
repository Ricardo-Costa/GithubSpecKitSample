import type { Task, TaskStatus } from '../../../types/task';

interface TaskStatusSelectProps {
  task: Task;
  onChangeStatus: (taskId: number, status: TaskStatus) => Promise<void>;
}

export const TaskStatusSelect = ({ task, onChangeStatus }: TaskStatusSelectProps) => (
  <select
    value={task.status}
    onChange={(event) => onChangeStatus(task.id, event.target.value as TaskStatus)}
  >
    <option value="pending">pending</option>
    <option value="in_progress">in_progress</option>
    <option value="completed">completed</option>
  </select>
);
