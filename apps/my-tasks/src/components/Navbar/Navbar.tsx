import { NavLink } from 'react-router-dom';
import { RoutingLink } from '../../router';

export interface NavbarProps {
  title: string;
  links?: RoutingLink[];
}

export const Navbar = ({ title, links }: NavbarProps) => {
  return (
    <nav className="w-full bg-green-100 p-4 flex flex-row justify-between border-b-2 border-green-700">
      <h1 className="text-xl font-semibold text-green-700">{title}</h1>
      <ul className="flex flex-row gap-4">
        {links?.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
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
  );
};
