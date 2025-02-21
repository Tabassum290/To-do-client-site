import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the database
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tasks");
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks by category
  const toDoTasks = tasks.filter(task => task.category === "To-Do");
  const inProgressTasks = tasks.filter(task => task.category === "In-Progress");
  const doneTasks = tasks.filter(task => task.category === "Done");

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* To-Do Tasks */}
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4">To-Do</h2>
          <div className="space-y-4">
            {toDoTasks.map((task) => (
              <div key={task._id} className="card card-compact w-full bg-base-100 shadow-md h-64">
                <div className="card-body flex flex-col justify-between h-full">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">{task.description}</p>
                  <p className="text-sm text-gray-500">{task.timestamp}</p>
                  <div className="flex justify-between items-center">
                  <div className="mt-2">
                    <span className="badge badge-info py-2">{task.category}</span>
                  </div>
                  <Link to='/edittask' className="btn btn-sm btn-outline">Edit</Link>
                  <button className="btn btn-sm text-red-600 btn-outline">Delete</button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In Progress Tasks */}
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4">In Progress</h2>
          <div className="space-y-4">
            {inProgressTasks.map((task) => (
              <div key={task._id} className="card card-compact w-full bg-base-100 shadow-md h-64">
                <div className="card-body flex flex-col justify-between h-full">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">{task.description}</p>
                  <p className="text-sm text-gray-500">{task.timestamp}</p>
                  <div className="flex justify-between items-center">
                  <div className="mt-2">
                    <span className="badge badge-warning py-2">{task.category}</span>
                  </div>
                  <Link to='/edittask' className="btn btn-sm btn-outline">Edit</Link>
                  <button className="btn btn-sm text-red-600 btn-outline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Done Tasks */}
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Done</h2>
          <div className="space-y-4">
            {doneTasks.map((task) => (
              <div key={task._id} className="card card-compact w-full bg-base-100 shadow-md h-64">
                <div className="card-body flex flex-col justify-between h-full">
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">{task.description}</p>
                  <p className="text-sm text-gray-500">{task.timestamp}</p>
                  <div className="flex justify-between items-center">
                  <div className="mt-2">
                    <span className="badge badge-success py-2">{task.category}</span>
                  </div>
                  <Link to='/edittask' className="btn btn-sm btn-outline">Edit</Link>
                  <button className="btn btn-sm text-red-600 btn-outline">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
