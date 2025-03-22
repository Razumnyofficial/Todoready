import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import InfoTasks from "../components/InfoTasks";

import Header from "../components/Header";
import { getfetchData } from "../components/api/todos";
import { Todo, TodoInfo } from "../components/types/todos";

function Page() {
  // const [filterParams, setFilterParams] = useState<boolean | null>(null);
  const [tasksData, setTasksData] = useState<Todo[]>([]);
  const [infoTodo, setInfoTodo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const fetchData = async (filter: "all" | "inWork" | "completed" = "all") => {
    try {
      const data = await getfetchData(filter);
      setTasksData(data.data);
      setInfoTodo(data.info);
    } catch (err) {
      console.error("Ошибка при загрузке задач", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="backgroundapp">
        <Header fetchData={fetchData} />
        <InfoTasks
          // setFilterParams={setFilterParams}
          infoTodo={infoTodo}
          fetchData={fetchData}
        />
        <Tasks
          info={tasksData}
          fetchData={fetchData}
          // filterParams={filterParams}
        />
      </div>
    </div>
  );
}

export default Page;
