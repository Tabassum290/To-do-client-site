import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../Hooks/UsePublic";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UsePublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/tasks/${user?.email}`);
      return res.data;
    },
  });

  const handleStatusChange = async (title, description, time) => {
    if (!newStatus) return;
  
    try {
      await axiosPublic.put(`/tasks/${selectedTask._id}`, {
        category: newStatus, 
        title: title, 
        description: description, 
        timestamp: time,
      });
      toast.success("Task status and details updated!");
      refetch();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error updating task status.");
    }
  };
  
  const toDoTasks = data?.filter((task) => task.category === "To-Do") || [];
  const inProgressTasks = data?.filter((task) => task.category === "In-Progress") || [];
  const doneTasks = data?.filter((task) => task.category === "Done") || [];

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/tasks/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your task has been deleted.",
            icon: "success",
          });
          refetch();
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting your task. Please try again.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setNewStatus(task.category);
    setIsModalOpen(true);
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
                  <div key={task._id} className="card card-compact w-full shadow-md h-64 task border border-[#b1abef] text-black">
                    <div className="card-body flex flex-col justify-between h-full">
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      <p className="text-sm">{task.description}</p>
                      <p className="text-sm text-gray-900">{task.timestamp}</p>
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
    <div className="bg-white text-black p-6 rounded-md shadow-lg w-80 sm:w-80 md:w-96 lg:w-1/3 max-h-full sm:max-h-[80vh] lg:max-h-[60vh] overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">Edit Task Status</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          const time = e.target.time.value;
          handleStatusChange(title, description, time); 
        }}
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            name="title"
            placeholder="Type here"
            defaultValue={selectedTask?.title}
            className="input input-bordered w-full"
            maxLength={50}
            required
          />
        </label>

        <label className="form-control w-full mt-4">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Type here"
            defaultValue={selectedTask?.description}
            maxLength={200}
          ></textarea>
        </label>

        <label className="form-control w-full mt-4">
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

        <div className="mb-4 mt-4">
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

        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <button type="submit" className="btn text-white btn-primary w-full sm:w-auto mb-4 sm:mb-0">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="btn text-white btn-secondary w-full sm:w-auto"
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
