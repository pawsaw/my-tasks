import { useState } from 'react';
import { Task } from '@my-tasks/my-tasks-dto';
import { useNavigate } from 'react-router-dom';

export const TaskList = () => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState<Task[]>([
    { id: '1', title: 'Task 1', description: 'Description 1', status: 'To Do' },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'In Progress',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'Completed',
    },
  ]);

  const handleEdit = (task: Task) => {
    console.log('Edit task', task);
    navigate(`${task.id}/edit`);
  };

  const handleDelete = (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Task List ({taskList.length})</h2>
      <ul className="mt-4">
        {taskList.map((task, index) => (
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
    </div>
  );
};
