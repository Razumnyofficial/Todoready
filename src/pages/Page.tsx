import { useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import TitleTasks from "../components/InfoTasks";

import Header from "../components/Header";
import { getfetchData } from "../components/api/todos";
import { Todo } from "../components/types/todos";

function Page() {
  const [filterParams, setFilterParams] = useState<boolean | null>(null);
  const [tasksData, setTasksData] = useState<Todo[]>([]);

  const fetchData = async () => {
    try {
      const data = await getfetchData();
      setTasksData(data);
      // console.log(data);
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
        <TitleTasks setFilterParams={setFilterParams} />
        <Tasks
          info={tasksData}
          fetchData={fetchData}
          filterParams={filterParams}
        />
      </div>
    </div>
  );
}

export default Page;
