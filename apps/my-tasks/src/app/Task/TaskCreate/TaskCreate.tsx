import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../../../hooks/useTasks';

export const TaskCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ title, description });
    createTask({ title, description, status: 'To Do' }).then(() => {
      setTitle('');
      setDescription('');
      navigate('..');
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Create a Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full border focus:ring-2 focus:ring-green-500 focus:outline-none"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <Link to="..">←&nbsp;back</Link>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 hover:bg-green-700 transition"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};
