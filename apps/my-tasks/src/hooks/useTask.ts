import { Task } from '@my-tasks/my-tasks-dto';
import { useCallback, useEffect, useState } from 'react';

export const useTask = (id: string) => {
  const [task, setTask] = useState<Task | null>(null);
  const reload = useCallback(async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${id}`
    );
    if (res.ok) {
      const _task = await res.json();
      setTask(_task);
    }
  }, [id]);

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
        reload();
      }
    },
    [reload]
  );

  useEffect(() => {
    reload();
  }, [reload]);

  return { task, reload, updateTask, loading: task === null };
};
