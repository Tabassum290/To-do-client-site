import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { LuNotebookPen } from "react-icons/lu";
import { ImSpinner10 } from "react-icons/im";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const TaskColumn = ({ category, tasks, onDrop, onEdit, refetch }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onDrop(item.id, category),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const getCategoryIcon = (category) => {
    switch (category) {
      case "To-Do":
        return <>
         <h2 className="text-2xl flex font-bold mb-4">
            TO_DO
         <LuNotebookPen className=" text-4xl p-2" />
         </h2>
        </>
      case "In-Progress":
        return <>
        <h2 className="text-2xl flex font-bold mb-4">
          In-Progress
        <ImSpinner10 className=" text-4xl p-2" />
        </h2>
       </>
    
      case "Done":
        return  <>
        <h2 className="text-2xl flex font-bold mb-4">
           Done
        <IoCheckmarkDoneCircle className=" text-4xl p-2" />
        </h2>
       </>
    
      default:
        return null;
    }
  };
  return (
    <div ref={drop} className={`p-4 rounded-md ${isOver ? "bg-green-100" : ""}`}>
      <h2 className="text-xl font-bold mb-4">
      {getCategoryIcon(category)} 
        </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onEdit={onEdit} refetch={refetch} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
