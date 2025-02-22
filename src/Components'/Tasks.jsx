import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import UsePublic from "../Hooks/UsePublic";
import TaskColumn from "./TaskColumn";
import EditModal from "./EditModal";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = UsePublic();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const { data ,refetch} = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const res = await axiosPublic(`/tasks/${user?.email}`);
      return res.data ;
    },
  });
  const handleStatusChange = async (id, newCategory) => {
    await axiosPublic.put(`/tasks/${id}`, { category: newCategory });
    toast.success("Task moved successfully!");
    refetch();
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // const sortedTasks = data?.sort((a, b) => a.order - b.order) || [];
  // console.log(sortedTasks);

  // const moveTask = (draggedIndex, hoverIndex, category) => {
  //   console.log("Data before filtering:", data); // Log the entire data array
  //   console.log("Category being passed:", category); // Log the category value
  
  //   // Get the tasks for the specific category (To-Do, In-Progress, Done)
  //   const columnTasks = data?.filter((task) => task.category === category);
  
  //   console.log("Column tasks before reordering:", columnTasks); // Debugging
  
  //   if (!columnTasks || columnTasks.length === 0) {
  //     console.log("No tasks found for this category!"); // Debugging
  //     return;
  //   }
  
  //   // Make a copy of the tasks to reorder them
  //   const reorderedTasks = [...columnTasks]; // Using the tasks for the specific category
  
  //   console.log("Reordered tasks before modification:", reorderedTasks); // Debugging
  
  //   const draggedTask = reorderedTasks[draggedIndex];
  
  //   if (!draggedTask) {
  //     console.log("Dragged task not found!"); // Debugging
  //     return;
  //   }
  
  //   // Remove the dragged task from its original position
  //   reorderedTasks.splice(draggedIndex, 1);
  
  //   // Insert dragged task at the hover index
  //   reorderedTasks.splice(hoverIndex, 0, draggedTask);
  
  //   console.log("Reordered tasks after modification:", reorderedTasks); // Debugging
  
  //   // Update the backend with the new task order
  //   reorderedTasks.forEach((task, index) => {
  //     console.log("Updating task with id:", task._id); // Debugging
  //     axiosPublic.put(`/tasks/${task._id}`, { order: index });
  //   });
  

  //   refetch();
  // };
  
  
  

  return (
    <div className="py-8 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {["To-Do", "In-Progress", "Done"].map((category) => (
        <TaskColumn
          key={category}
          category={category}
          tasks={data?.filter((task) => task.category === category) || []}
          onDrop={handleStatusChange}
          onEdit={handleEdit}
          refetch={refetch}
        />
      ))}
      {isModalOpen && <EditModal task={selectedTask} onClose={() => setIsModalOpen(false)} refetch={refetch} />}
    </div>
  );
};

export default Tasks;