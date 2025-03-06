import { useState } from "react";
import "./tasks.css";
import { Todo } from "../types/todos";
import Task from "../Task";

const Tasks = ({
  info,
  removeItem,
  filterParams,
  fetchupdateTask,
}: {
  info: Todo[];
  removeItem: (id: number) => void;
  filterParams: boolean | null;
  fetchupdateTask: (id: number, title: string, isDone?: boolean) => void;
}) => {
  const [editingTaskId, setEditingTaskId] = useState(0);
  const [editedTaskName, setEditedTaskName] = useState("");

  const progressTasks =
    filterParams === null
      ? info.sort((item1, item2) => item2.id - item1.id)
      : info.filter((item) => item.isDone === filterParams);

  const handleEditClick = (item: Todo) => {
    setEditingTaskId(item.id);
    setEditedTaskName(item.title);
  };

  const handleSaveEdit = () => {
    fetchupdateTask(editingTaskId, editedTaskName);
    setEditingTaskId(0);
  };

  return (
    <div className="datainfo">
      {progressTasks.map((item) => (
        <Task
          item={item}
          key={item.id}
          removeItem={removeItem}
          handleEditClick={handleEditClick}
          handleSaveEdit={handleSaveEdit}
          editingTaskId={editingTaskId}
          editedTaskName={editedTaskName}
          setEditedTaskName={setEditedTaskName}
          setEditingTaskId={setEditingTaskId}
          fetchupdateTask={fetchupdateTask}
        />
      ))}
    </div>
  );
};

export default Tasks;
