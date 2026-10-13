import { Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { warmAccentStops } from '../theme';

function Root() {
  return (
    <>
      <svg className='ui-gradient-definitions' aria-hidden='true' focusable='false'>
        <defs>
          <linearGradient id='multitool-ui-gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
            {warmAccentStops.map(({ offset, color }) => (
              <stop key={offset} offset={`${offset}%`} stopColor={color} />
            ))}
          </linearGradient>
        </defs>
      </svg>
      <ResponsiveAppBar />
      <main className="app-content">
        <Outlet />
      </main>
    </>
  );
}

export default Root;
