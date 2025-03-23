import { createBrowserRouter, redirect } from 'react-router-dom';
import { Task } from './app/Task/Task';
import { TaskDetail } from './app/Task/TaskDetail/TaskDetail';
import { TaskCreate } from './app/Task/TaskCreate/TaskCreate';
import { TaskEdit } from './app/Task/TaskEdit/TaskEdit';
import { App } from './app/App';
import { About } from './app/About/About';
import { TaskList } from './app/Task/TaskList/TaskList';

export const router = createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: 'tasks',
        Component: Task,
        children: [
          {
            path: 'create',
            Component: TaskCreate,
          },
          {
            path: ':id',
            Component: TaskDetail,
          },
          {
            path: ':id/edit',
            Component: TaskEdit,
          },
          {
            path: '',
            Component: TaskList,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: '*',
        loader: () => redirect('/tasks'),
      },
    ],
  },
]);

export interface RoutingLink {
  label: string;
  to: string;
}

export const appRoutingLinks: RoutingLink[] = [
  { label: 'Tasks', to: '/tasks' },
  { label: 'About', to: '/about' },
];
