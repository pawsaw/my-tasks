import { useEffect } from 'react';
import { Task } from '@my-tasks/my-tasks-dto';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../../hooks/useTasks';

export const TaskList = () => {
  const navigate = useNavigate();
  const { tasks, reloadTasks, deleteTask, updateTask } = useTasks();

  useEffect(() => {
    reloadTasks();
  }, [reloadTasks]);

  const handleEdit = (task: Task) => {
    console.log('Edit task', task);
    navigate(`${task.id}/edit`);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    updateTask(id, {
      ...tasks?.find((task) => task.id === id),
      status: newStatus,
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Task List ({tasks?.length})</h2>
      {tasks?.length ? (
        <ul className="mt-4">
          {tasks?.map((task, index) => (
            <li
              key={task.id}
              className={`p-4 border-collapse border-b-2 border-green-100 ${
                index % 2 === 0 ? 'bg-green-50' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-4 items-baseline flex-1">
                  <h3 className="font-bold flex-1 text-green-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex-[2]">
                    {task.description}
                  </p>
                </div>
                <div className="flex flex-row gap-4 items-baseline">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task.id,
                        e.target.value as Task['status']
                      )
                    }
                    className="mt-2 p-1 border focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <button
                    className="text-blue-600"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full flex flex-col items-center">
          <p className="text-xl">No tasks found.</p>
          <div>
            <button
              className="bg-green-600 text-white py-2 hover:bg-green-700 transition p-4 mt-4"
              onClick={() => navigate('create')}
            >
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
