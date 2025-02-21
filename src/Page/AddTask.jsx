import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../Components'/Navbar";
import Footer from "../Components'/Footer";
import UsePublic from "../Hooks/UsePublic";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
 const axiosPublic = UsePublic();
  const handleForm = async (e) => {
    e.preventDefault();
    
    const title = e.target.title.value;
    const description = e.target.description.value;
    const time = e.target.time.value;
    const status = e.target.status.value;
    
    const taskInfo = { title, description, timestamp: time, category: status };
    console.log(taskInfo);

    try {
      setLoading(true);
      const res = await axiosPublic.post("/tasks", taskInfo);

      if (res.status === 200) {
        toast.success("Task added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1 className="text-4xl text-center my-6 font-semibold">Add New Task</h1>
      <form
        onSubmit={handleForm}
        className="max-w-2xl mx-auto my-8 border border-yellow-400 p-8 flex justify-center items-center flex-col max-h-screen"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input type="text" name="title" placeholder="Type here" className="input input-bordered w-full" maxLength={50}
            required />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea name="description" className="textarea textarea-bordered" placeholder="Type here" maxLength={200}></textarea>
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
          <select name="status" className="select select-bordered w-full" defaultValue="To-Do" required>
            <option>To-Do</option>
            <option>In-Progress</option>
            <option>Done</option>
          </select>
        </label>

        <label>
          <button
            type="submit"
            className="btn btn-md mt-6"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Task"}
          </button>
        </label>
      </form>
      <Footer />
    </div>
  );
};

export default AddTask;
