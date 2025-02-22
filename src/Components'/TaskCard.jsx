import { useDrag } from "react-dnd";
import Swal from "sweetalert2";
import UsePublic from "../Hooks/UsePublic";
import { toast } from "react-toastify";

const TaskCard = ({ task, onEdit, refetch }) => {
  const axiosPublic = UsePublic();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id }, 
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosPublic.delete(`/tasks/${task._id}`);
        toast.success("Task deleted successfully!");
        refetch();
      }
    });
  };

  return (
    <div ref={drag} className={`card p-4 border border-blue-400 text-black  ${isDragging ? "opacity-50" : "opacity-100"} task `}>
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-600">{task.timestamp}</p>
      <div className="flex justify-between mt-2">
        <span className="badge badge-success text-white">{task.category}</span>
        <button onClick={() => onEdit(task)} className="btn btn-outline btn-sm">Edit</button>
        <button onClick={handleDelete} className="btn btn-outline btn-sm text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;
