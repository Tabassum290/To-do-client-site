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
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
    errorElement:<Error/>
  },
  {
    path:'/login',
    element:<Login/>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ToastContainer></ToastContainer>
    <RouterProvider router={router}/>
    </AuthProvider>

  </StrictMode>,
)
