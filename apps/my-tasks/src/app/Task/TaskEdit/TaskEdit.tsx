import { use, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../../../hooks/useTask';
import { Task } from '@my-tasks/my-tasks-dto';

export const TaskEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { task, updateTask } = useTask(id!);

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [status, setStatus] = useState(task?.status ?? 'To Do');

  useEffect(() => {
    if (!task) {
      return;
    }
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log({ title, description, status });
    updateTask(id!, { title, description, status }).then(() => {
      navigate('..');
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input
            type="text"
            value={id}
            readOnly
            disabled
            className="mt-1 p-2 w-full border focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'])}
            className="mt-1 p-2 w-full border focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-between items-baseline gap-4">
          <Link to="..">←&nbsp;back</Link>
          <button
            disabled={!title || !description}
            type="submit"
            className="w-full bg-green-600 text-white py-2 hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
