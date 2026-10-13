import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

function Root() {
  return (
    <>
      <ResponsiveAppBar />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}

export default Root;
