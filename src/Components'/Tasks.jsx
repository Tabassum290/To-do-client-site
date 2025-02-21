import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../Hooks/UsePublic";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const axiosPublic = UsePublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");

const {data} = useQuery({
  queryKey: "data",
  queryFn : async(data) =>
    const res = await axiosPublic(`/tasks/${user?.email}`)
  return res.data;
}
 

)


  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:4000/tasks/${user?.email}`);
  //     setTasks(response.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch tasks.");
  //   }
  // };

  // useEffect(() => {
  //   fetchTasks();
  // }, []);

  const toDoTasks = tasks.filter((task) => task.category === "To-Do");
  const inProgressTasks = tasks.filter((task) => task.category === "In-Progress");
  const doneTasks = tasks.filter((task) => task.category === "Done");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success",
        });
        fetchTasks();
      }
    });
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setNewStatus(task.category); 
    setIsModalOpen(true);
  };

  const handleStatusChange = async () => {
    if (!newStatus) return;
    
    try {
      await axios.put(`http://localhost:4000/tasks/${selectedTask._id}`, {
        category: newStatus,
      });
      toast.success("Task status updated!");
      setIsModalOpen(false);
      fetchTasks();
    } catch (error) {
      toast.error("Error updating task status.");
    }
  };

  return (
    <div className="py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[toDoTasks, inProgressTasks, doneTasks].map((taskCategory, index) => {
          const categoryNames = ["To-Do", "In Progress", "Done"];
          return (
            <div key={categoryNames[index]}>
              <h2 className="text-2xl font-semibold mb-4">{categoryNames[index]}</h2>
              <div className="space-y-4">
                {taskCategory.map((task) => (
                  <div key={task._id} className="card card-compact w-full bg-base-100 shadow-md h-64">
                    <div className="card-body flex flex-col justify-between h-full">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-sm">{task.description}</p>
                      <p className="text-sm text-gray-500">{task.timestamp}</p>
                      <div className="flex justify-between items-center">
                        <div className="mt-2">
                          <span className="badge badge-success text-white py-2">{task.category}</span>
                        </div>
                        <button
                          onClick={() => handleEdit(task)}
                          className="btn btn-sm btn-outline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="btn btn-sm text-red-600 btn-outline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Edit Task Status</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleStatusChange();
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="select select-bordered w-full mt-2"
                  >
                    <option value="To-Do">To-Do</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="btn btn-secondary w-full sm:w-auto ml-4"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
