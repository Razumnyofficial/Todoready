import { TodoInfo } from "../types/todos";
import { useEffect, useState } from "react";
import { getfetchInfo } from "../api/todos";
import "./infotasks.css";

import { Button } from "antd";

interface InfoTasksProps {
  setFilterParams: (value: boolean | null) => void;
}
const InfoTasks: React.FC<InfoTasksProps> = ({ setFilterParams }) => {
  const [infoTitle, setInfoTitle] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });

 

  const fetchInfo = async () => {
    try {
      const info = await getfetchInfo();
      setInfoTitle(info);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="title_tasks">
      <Button type="text" onClick={() => setFilterParams(null)}>
        Все ({infoTitle.all})
      </Button>
      <Button type="text" onClick={() => setFilterParams(false)}>
        В работе ({infoTitle.inWork})
      </Button>
      <Button type="text" onClick={() => setFilterParams(true)}>
        Завершено ({infoTitle.completed})
      </Button>
    </div>
  );
};

export default InfoTasks;
