import { FcGoogle } from "react-icons/fc";
import Navbar from "../Components'/Navbar";
import Footer from "../Components'/Footer";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UsePublic from "../Hooks/UsePublic";

const Login = () => {
    const {setUser,signinWithGoogle} = useContext(AuthContext);
    const axiosPublic = UsePublic();
    const navigate = useNavigate()
    const handleGoogle =()=>{
		signinWithGoogle()
		.then(result =>{
			const userInfo ={
        uid: result.user?.uid,
        name: result.user?.displayName,   
				email : result.user?.email,
			}
      console.log(userInfo);
			axiosPublic.post('/users',userInfo)
			.then(res=>{
				console.log(res.data);
				toast.success("Login Successfull", "Welcome!","success");
				navigate('/');
			})
		})
		}
  
  return (
    <div>
        <Navbar/>
        <div className="max-w-7xl mx-auto flex justify-around items-center">
            <div className="w-1/2">
            <DotLottieReact
        src="https://lottie.host/5ccc8667-39e6-4a2c-aac1-b63eb0212a1f/KF8VTCGfUi.lottie"
        loop
        autoplay
      />
            </div>
            <div className="w-[1px] h-[400px] bg-black ml-0"></div>
            <div className="w-1/2 flex justify-center items-center h-screen">
      <div className=" p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-6">Welcome</h2>
        <p className="text-md my-4 text-blue-500">Want to Manage Your Task ?</p>
        <button
          onClick={handleGoogle}
          className="flex items-center border justify-center w-full px-12 py-3 font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition"
        >
         <FcGoogle className="text-3xl px-1" />
          Sign in with Google
        </button>
      </div>
    </div>
        </div>

    <Footer/>
    </div>

  );
};

export default Login;
