import { TodoInfo } from "../types/todos";
import { useState } from "react";
// import { getfetchData } from "../api/todos";
import "./infotasks.css";

import { Button } from "antd";

interface InfoTasksProps {
  fetchData: (filter: "all" | "inWork" | "completed") => void;
  // setFilterParams: (value: boolean | null) => void;
  infoTodo: TodoInfo;
}
const InfoTasks: React.FC<InfoTasksProps> = ({
  // setFilterParams,
  infoTodo,
  fetchData,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const handleFilterChange = (filter: "all" | "inWork" | "completed") => {
    fetchData(filter);
    setSelectedFilter(filter);
  };

  return (
    <div className="title_tasks">
      <Button
        className={selectedFilter === "all" ? "all" : ""}
        type="text"
        onClick={() => handleFilterChange("all")}
      >
        Все ({infoTodo.all})
      </Button>
      <Button
        className={selectedFilter === "inWork" ? "inWork" : ""}
        type="text"
        onClick={() => handleFilterChange("inWork")}
      >
        В работе ({infoTodo.inWork})
      </Button>
      <Button
        className={selectedFilter === "completed" ? "completed" : ""}
        type="text"
        onClick={() => handleFilterChange("completed")}
      >
        Завершено ({infoTodo.completed})
      </Button>
    </div>
  );
};

export default InfoTasks;
