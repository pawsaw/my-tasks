import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { appRoutingLinks } from '../router';

export const App = () => {
  return (
    <>
      <Navbar title="my Tasks" links={appRoutingLinks} />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </>
  );
};
