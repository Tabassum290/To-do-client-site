import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Theme from "./Theme";

const Navbar = () => {
  const {user,signOutUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const logOut =()=>{
    signOutUser();
  navigate('/');
  }
    const links = (
        <>
            <NavLink to="/" className="px-4 py-2">Home</NavLink>
            <NavLink to="/addtask" className="px-4 py-2">Add Task</NavLink>
        </>
    );

    return (
        <div className="w-full bg-[#344CB7] text-[#FFEB00]">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="dropdown lg:hidden">
                        <button tabIndex={0} className="btn btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="text-xl font-serif uppercase italic font-semibold">FlowTask</a>
                </div>

                <div className="hidden lg:flex space-x-4">{links}</div>

                <div className="flex items-center">
                    <div className="px-2">
                        <Theme/>
                    </div>
                  {
                    user?  <button onClick={logOut} className="btn text-yellow-600 bg-white">Logout</button> :  <Link to="/login" className="btn text-yellow-600 bg-white">Login</Link>
                  }

                </div>
            </div>
        </div>
    );
};

export default Navbar;