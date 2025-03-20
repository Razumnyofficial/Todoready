import { TodoInfo } from "../types/todos";
// import { useEffect, useState } from "react";
// import { getfetchData } from "../api/todos";
import "./infotasks.css";

import { Button } from "antd";

interface InfoTasksProps {
  fetchData: (filter: string) => void;
  // setFilterParams: (value: boolean | null) => void;
  InfoTodo: TodoInfo;
}
const InfoTasks: React.FC<InfoTasksProps> = ({
  // setFilterParams,
  InfoTodo,
  fetchData,
}) => {
  const handleFilterChange = (filter: string) => {
    fetchData(filter);
  };

  return (
    <div className="title_tasks">
      {/* <Button type="text" onClick={() => setFilterParams(null)}>
        Все ({InfoTodo.all})
      </Button>
      <Button type="text" onClick={() => setFilterParams(false)}>
        В работе ({InfoTodo.inWork})
      </Button>
      <Button type="text" onClick={() => setFilterParams(true)}>
        Завершено ({InfoTodo.completed})
      </Button> */}

      <Button type="text" onClick={() => handleFilterChange("all")}>
        Все ({InfoTodo.all})
      </Button>
      <Button type="text" onClick={() => handleFilterChange("inWork")}>
        В работе ({InfoTodo.inWork})
      </Button>
      <Button type="text" onClick={() => handleFilterChange("completed")}>
        Завершено ({InfoTodo.completed})
      </Button>
    </div>
  );
};

export default InfoTasks;
