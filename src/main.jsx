import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Page/Home';
import Error from './Page/Error';
import Login from './Page/Login';
import AuthProvider from './Provider/AuthProvider';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './Private/PrivateRoute';
import AddTask from './Page/AddTask';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { useMediaQuery } from 'react-responsive'; 

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 400 }); 

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />
    },
    {
      path: '/',
      element: <PrivateRoute><Home /></PrivateRoute>,
    },
    {
      path: '/addtask',
      element: <PrivateRoute><AddTask /></PrivateRoute>,
    },
  ]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <AuthProvider>
            <ToastContainer />
            <RouterProvider router={router} />
          </AuthProvider>
        </DndProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
