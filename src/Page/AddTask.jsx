import { useContext, useState } from "react";
import { toast } from "react-toastify";
import UsePublic from "../Hooks/UsePublic";
import { AuthContext } from "../Provider/AuthProvider";
import Navbar from "../Components'/Navbar";
import Footer from "../Components'/Footer";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const axiosPublic = UsePublic();
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const time = e.target.time.value;
    const status = e.target.status.value;
    const email = user?.email;
    const taskInfo = { title, description, timestamp: time, category: status, email };
    console.log(taskInfo);

    try {
      setLoading(true);
      const res = await axiosPublic.post("/tasks", taskInfo);
       
      if (res.status === 200) {
        toast.success("Task added successfully!");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1 className="text-4xl text-center my-6 font-semibold">Add New Task</h1>
      <form
        onSubmit={handleForm}
        className="max-w-2xl mx-auto my-8 border border-yellow-400 p-8 flex flex-col gap-6 rounded-md shadow-lg bg-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            className="input input-bordered w-full"
            maxLength={50}
            required
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Type here"
            maxLength={200}
          ></textarea>
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Timestamp</span>
          </div>
          <input
            type="text"
            name="time"
            placeholder="Type here"
            className="input input-bordered w-full"
            defaultValue={new Date().toLocaleString()}
            readOnly
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Category</span>
          </div>
          <select
            name="status"
            className="select select-bordered w-full"
            defaultValue="To-Do"
            required
          >
            <option>To-Do</option>
            <option>In-Progress</option>
            <option>Done</option>
          </select>
        </label>

        <button
          type="submit"
          className="btn btn-md btn-primary mt-6 w-full sm:w-auto"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Task"}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddTask;
