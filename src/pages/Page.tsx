import { useCallback, useEffect, useState } from "react";
import Tasks from "../components/Tasks";
import InfoTasks from "../components/InfoTasks";

import Header from "../components/Header";
import { getfetchData } from "../components/api/todos";
import { FilterParams, Todo, TodoInfo } from "../components/types/todos";
import React from "react";

const MemoHeader = React.memo(Header);
const MemoInfoTasks = React.memo(InfoTasks);
const MemoTasks = React.memo(Tasks);

function Page() {
  const [tasksData, setTasksData] = useState<Todo[]>([]);
  const [infoTodo, setInfoTodo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

  const [selectedFilter, setSelectedFilter] = useState<FilterParams>("all");

  const fetchData = useCallback(
    async (filter: FilterParams = selectedFilter) => {
      try {
        const data = await getfetchData(filter);
        setTasksData(data.data);
        setInfoTodo(data.info);
      } catch (err) {
        console.error("Ошибка при загрузке задач", err);
      }
    },
    [selectedFilter]
  );

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
      console.log("Задачи обновились");
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedFilter, fetchData]);

  return (
    <div className="App">
      <div className="backgroundapp">
        <MemoHeader fetchData={fetchData} />
        <MemoInfoTasks
          
          infoTodo={infoTodo}
          fetchData={fetchData}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <MemoTasks
          info={tasksData}
          fetchData={fetchData}
         
        />
      </div>
    </div>
  );
}

export default Page;
