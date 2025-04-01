import "./tasks.css";
import { Todo } from "../types/todos";
import Task from "../Task";

const Tasks = ({
  fetchData,
  info,
}: {
  fetchData: () => void;
  info: Todo[];
}) => {
  return (
    <div className="datainfo">
      {info.map((item) => (
        <Task item={item} key={item.id} fetchData={fetchData} />
      ))}
    </div>
  );
};

export default Tasks;
