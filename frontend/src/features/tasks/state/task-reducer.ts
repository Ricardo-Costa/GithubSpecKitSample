import type { Task, TaskFilter } from '../../../types/task';

export interface TaskState {
  tasks: Task[];
  filters: TaskFilter;
  loading: boolean;
  error: string | null;
}

export type TaskAction =
  | { type: 'set_tasks'; payload: Task[] }
  | { type: 'add_task'; payload: Task }
  | { type: 'update_task'; payload: Task }
  | { type: 'set_loading'; payload: boolean }
  | { type: 'set_error'; payload: string | null }
  | { type: 'set_filters'; payload: Partial<TaskFilter> }
  | { type: 'clear_filters' };

export const initialTaskState: TaskState = {
  tasks: [],
  filters: {},
  loading: false,
  error: null
};

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'set_tasks':
      return { ...state, tasks: action.payload };
    case 'add_task':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'update_task':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case 'set_loading':
      return { ...state, loading: action.payload };
    case 'set_error':
      return { ...state, error: action.payload };
    case 'set_filters':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'clear_filters':
      return { ...state, filters: {} };
    default:
      return state;
  }
};
