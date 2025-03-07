import { TodoInfo } from "../types/todos";
import { useEffect, useState } from "react";
import { getfetchInfo } from "../api/todos";
import "./titletask.css";

interface InfoTasksProps {
  setFilterParams: (value: boolean | null) => void;
}
const InfoTasks: React.FC<InfoTasksProps> = ({ setFilterParams }) => {
  const fetchInfo = async () => {
    try {
      const info = await getfetchInfo();
      setInfoTitle(info);
    } catch (error) {
      console.error(error);
    }
  };

  const [infoTitle, setInfoTitle] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  useEffect(() => {
    fetchInfo();
  }, []);

  console.log(infoTitle.inWork);

  return (
    <div className="title_tasks">
      <button className="tasks_btn" onClick={() => setFilterParams(null)}>
        все ({infoTitle.all})
      </button>
      <button className="tasks_btn" onClick={() => setFilterParams(false)}>
        в работе ({infoTitle.inWork})
      </button>
      <button className="tasks_btn" onClick={() => setFilterParams(true)}>
        завершено ({infoTitle.completed})
      </button>
    </div>
  );
};

export default InfoTasks;
