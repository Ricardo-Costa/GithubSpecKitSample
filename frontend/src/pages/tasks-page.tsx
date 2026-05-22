import { useEffect, useReducer } from 'react';
import { TaskFilters } from '../features/tasks/components/task-filters';
import { TaskForm } from '../features/tasks/components/task-form';
import { TaskList } from '../features/tasks/components/task-list';
import { TaskEditForm } from '../features/tasks/components/task-edit-form';
import { createTask, listTasks, updateTaskStatus, updateTask } from '../features/tasks/services/task-api';
import { initialTaskState, taskReducer } from '../features/tasks/state/task-reducer';
import { ThemeToggle } from '../theme/theme-toggle';
import type { CreateTaskPayload, TaskStatus, UpdateTaskPayload } from '../types/task';
import { ApiError } from '../services/http-client';

export const TasksPage = () => {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const loadTasks = async () => {
    dispatch({ type: 'set_loading', payload: true });

    try {
      const tasks = await listTasks(state.filters);
      dispatch({ type: 'set_tasks', payload: tasks });
      dispatch({ type: 'set_error', payload: null });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Falha ao carregar tarefas.';
      dispatch({ type: 'set_error', payload: message });
    } finally {
      dispatch({ type: 'set_loading', payload: false });
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line -- exhaustive-deps rule unavailable in current lint config
  }, [state.filters.priority, state.filters.status, state.filters.date, state.filters.dateType]);

  const handleCreateTask = async (payload: CreateTaskPayload) => {
    try {
      const task = await createTask(payload);
      dispatch({ type: 'add_task', payload: task });
      dispatch({ type: 'set_error', payload: null });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Falha ao criar tarefa.';
      dispatch({ type: 'set_error', payload: message });
    }
  };

  const handleChangeStatus = async (taskId: number, status: TaskStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status);
      dispatch({ type: 'update_task', payload: updatedTask });
      dispatch({ type: 'set_error', payload: null });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Falha ao atualizar status.';
      dispatch({ type: 'set_error', payload: message });
    }
  };

  const handleEditTask = async (taskId: number, payload: UpdateTaskPayload) => {
    try {
      const updatedTask = await updateTask(taskId, payload);
      dispatch({ type: 'update_task', payload: updatedTask });
      dispatch({ type: 'set_error', payload: null });
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Falha ao editar tarefa.';
      dispatch({ type: 'set_error', payload: message });
    }
  };

  const editingTask = state.editingTaskId
    ? state.tasks.find((task) => task.id === state.editingTaskId)
    : undefined;

  return (
    <main className="tm-page">
      <section className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">Task Management App</h1>
          <p className="tm-muted">Gerencie tarefas do dia a dia com prioridade, status e filtros.</p>
        </div>
        <ThemeToggle />
      </section>

      {!state.editingTaskId ? (
        <TaskForm onCreate={handleCreateTask} />
      ) : editingTask ? (
        <TaskEditForm
          title={editingTask.title}
          description={editingTask.description}
          dataPrevistaConclusao={editingTask.dataPrevistaConclusao}
          priority={editingTask.priority}
          onSubmit={(payload) => handleEditTask(editingTask.id, payload)}
          onCancel={() => dispatch({ type: 'set_editing', payload: null })}
        />
      ) : null}

      <TaskFilters
        filters={state.filters}
        onChange={(changes) => dispatch({ type: 'set_filters', payload: changes })}
        onClear={() => dispatch({ type: 'clear_filters' })}
      />

      {state.loading ? <p className="tm-muted mb-3">Carregando tarefas...</p> : null}
      {state.error ? <p className="tm-error mb-3">{state.error}</p> : null}

      <TaskList tasks={state.tasks} onChangeStatus={handleChangeStatus} />
    </main>
  );
};
