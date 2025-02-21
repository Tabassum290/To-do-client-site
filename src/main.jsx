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
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/login",
    element:<Login/>,
    errorElement:<Error/>
  },
  {
    path:'/',
    element:<PrivateRoute><Home/></PrivateRoute>,
  },
  {
    path:'/addtask',
    element:<PrivateRoute><AddTask/></PrivateRoute>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <ToastContainer></ToastContainer>
    <RouterProvider router={router}/>
    </AuthProvider>
    </QueryClientProvider>


  </StrictMode>,
)
