import { NavLink, Outlet } from 'react-router-dom';
import { RoutingLink } from '../../router';

const routingLinks: RoutingLink[] = [
  { label: 'All', to: '' },
  { label: 'Create', to: 'create' },
];

export const Task = () => {
  return (
    <div>
      <nav className="flex justify-center">
        <ul className="flex flex-row gap-4">
          {routingLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  isActive
                    ? 'text-green-700 underline underline-offset-4'
                    : 'text-green-700'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
