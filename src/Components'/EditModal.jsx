import { useState } from "react";
import UsePublic from "../Hooks/UsePublic";
import { toast } from "react-toastify";

const EditModal = ({ task, onClose, refetch }) => {
  const axiosPublic = UsePublic();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [category, setCategory] = useState(task.category);

  const handleSave = async (e) => {
    e.preventDefault();
    await axiosPublic.put(`/tasks/${task._id}`, { title, description, category });
    toast.success("Task updated successfully!");
    refetch();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white text-black p-6 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSave}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Type here"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          <label className="form-control w-full mt-4">
            <div className="label">
              <span className="label-text">Status</span>
            </div>
            <select
              className="select select-bordered w-full mb-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="To-Do">To-Do</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Done">Done</option>
            </select>
          </label>

          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;