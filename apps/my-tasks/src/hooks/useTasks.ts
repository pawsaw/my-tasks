import { Task } from '@my-tasks/my-tasks-dto';
import { useCallback, useState } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const reloadTasks = useCallback(async () => {
    setTasks(null);
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`);
    if (res.ok) {
      const _tasks = await res.json();
      setTasks(_tasks);
    }
  }, []);

  const createTask = useCallback(
    async (taskData: Omit<Task, 'id'>) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        }
      );
      if (res.ok) {
        reloadTasks();
      }
    },
    [reloadTasks]
  );

  const updateTask = useCallback(
    async (id: string, taskData: Partial<Task>) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(taskData),
        }
      );
      if (res.ok) {
        reloadTasks();
      }
    },
    [reloadTasks]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        reloadTasks();
      }
    },
    [reloadTasks]
  );

  return {
    tasks,
    loading: tasks === null,
    reloadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
};
