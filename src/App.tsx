import { RouterProvider } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes, privateRoutes } from './routes';
import { selectIsLoggedIn } from './store/slices/userSlice';
import './App.css';

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <RouterProvider router={isLoggedIn ? privateRoutes : publicRoutes} />
  );
}

export default App;
