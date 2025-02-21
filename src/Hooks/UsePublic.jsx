import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://to-do-server-site.vercel.app",
});

const UsePublic = () => {
  return axiosPublic;
};

export default UsePublic;
