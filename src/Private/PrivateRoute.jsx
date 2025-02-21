import  { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components\'/Loader';
import { AuthContext } from '../Provider/AuthProvider';


const PrivateRoute = ( {children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
      return <Loader/>;
    }
    if(user && user?.email){
   return children;
    }
    return (
        <Navigate to={'/login'} state={location.pathname}></Navigate>
    );
};

export default PrivateRoute;