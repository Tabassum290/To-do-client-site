import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Page/Home';
import Error from './Page/Error';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home/>,
    errorElement:<Error/>
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
