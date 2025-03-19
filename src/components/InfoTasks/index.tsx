import { TodoInfo } from "../types/todos";
// import { useEffect, useState } from "react";
// import { getfetchData } from "../api/todos";
import "./infotasks.css";

import { Button } from "antd";

interface InfoTasksProps {
  setFilterParams: (value: boolean | null) => void;
  InfoTodo: TodoInfo;
}
const InfoTasks: React.FC<InfoTasksProps> = ({ setFilterParams, InfoTodo }) => {
  // const fetchData = async () => {
  //   try {
  //     const data = await getfetchData();
  //     setInfoTodo(data.info);
  //     console.log(data.info);
  //   } catch (err) {
  //     console.error("Ошибка при загрузке задач", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div className="title_tasks">
      <Button type="text" onClick={() => setFilterParams(null)}>
        Все ({InfoTodo.all})
      </Button>
      <Button type="text" onClick={() => setFilterParams(false)}>
        В работе ({InfoTodo.inWork})
      </Button>
      <Button type="text" onClick={() => setFilterParams(true)}>
        Завершено ({InfoTodo.completed})
      </Button>
    </div>
  );
};

export default InfoTasks;
