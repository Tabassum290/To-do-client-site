import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components\'/Navbar';
import Footer from '../Components\'/Footer';

const EditTask = () => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    time: '',
    status: 'To-Do'
  });
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchTaskData();
  }, [taskId]);

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTask = {
      title: e.target.title.value,
      description: e.target.description.value,
      time: task.time,  // Keep the original timestamp
      status: e.target.status.value,
    };

    try {
      // Send the updated task data to the backend
      await axios.put(`http://localhost:4000/tasks/${taskId}`, updatedTask);
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-4xl text-center my-6 font-semibold">Edit Task</h1>
      <form
        onSubmit={handleEdit}
        className="max-w-2xl mx-auto my-8 border border-yellow-400 p-8 flex justify-center items-center flex-col max-h-screen"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            name="title"
            defaultValue={task.title}
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
            defaultValue={task.description}
            className="textarea textarea-bordered"
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
            defaultValue={task.time}
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
            defaultValue={task.status}
            required
          >
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
            {loading ? 'Saving...' : 'Save Task'}
          </button>
        </label>
      </form>
      <Footer />
    </div>
  );
};

export default EditTask;
