import "./tasks.css";
import { Todo } from "../types/todos";
import Task from "../Task";

const Tasks = ({
  fetchData,
  info,
  filterParams,
  // fetchupdateTask,
}: {
  fetchData: () => Promise<void>;
  info: Todo[];
  filterParams: boolean | null;
  // fetchupdateTask: (id: number, title: string, isDone?: boolean) => void;
}) => {
  const progressTasks =
    filterParams === null
      ? info.sort((item1, item2) => item2.id - item1.id)
      : info.filter((item) => item.isDone === filterParams);
  console.log(progressTasks, "1");
  console.log(filterParams);
  return (
    <div className="datainfo">
      {info.map((item) => (
        <Task
          item={item}
          key={item.id}
          // fetchupdateTask={fetchupdateTask}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

export default Tasks;
