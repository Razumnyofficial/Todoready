import "./tasks.css";
import { Todo } from "../types/todos";
import Task from "../Task";

const Tasks = ({
  fetchData,
  info,
  filterParams,
}: {
  fetchData: () => Promise<void>;
  info: Todo[];
  filterParams: boolean | null;
}) => {
  const progressTasks =
    filterParams === null
      ? info.sort((item1, item2) => item2.id - item1.id)
      : info.filter((item) => item.isDone === filterParams);

  return (
    <div className="datainfo">
      {progressTasks.map((item) => (
        <Task item={item} key={item.id} fetchData={fetchData} />
      ))}
    </div>
  );
};

export default Tasks;
