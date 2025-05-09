import { useState } from "react";

import {
  CloseCircleOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Todo } from "@/types/todos";
import { Button, Input } from "antd";

import { deleteTask, updateTask } from "@/api/todos";

const Task = ({ fetchData, item }: { fetchData: () => void; item: Todo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleEditClick = (item: Todo) => {
    setIsEdit(true);
    setEditedTaskName(item.title);
    console.log(isEdit);
  };

  const handleSaveEdit = () => {
    fetchUpdateTask(item.id, editedTaskName);
    setIsEdit(false);
  };

  const removeTask = async (id: number) => {
    try {
      const response = await deleteTask(id);
      console.log("Задача удалилась:", response);
      await fetchData();
    } catch (error) {
      console.error("Ошибка при удалении задачи", error);
    }
  };

  const fetchUpdateTask = async (
    id: number,
    updatedTitle: string,
    updatedDone?: boolean
  ) => {
    const updatedTask = { title: updatedTitle, isDone: updatedDone };

    try {
      const response = await updateTask(id, updatedTask);

      await fetchData();
      console.log(response);
    } catch (error) {
      console.log("ошибка при обновлении задачи", error);
    }
  };

  return (
    <div className="item-container">
      <div className="title">
        <Input
          type="checkbox"
          checked={item.isDone}
          onChange={(e) =>
            fetchUpdateTask(item.id, item.title, e.target.checked)
          }
        />

        {isEdit ? (
          <div className="edit-form">
            <Input
              style={{ width: "400px", marginRight: "20px" }}
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            />
          </div>
        ) : (
          <span className={`info_items ${item.isDone ? "isDone" : ""}`}>
            {item.title}
          </span>
        )}

        <div className="icons_btn">
          {!isEdit ? (


            <Button
              icon={<EditOutlined />}
              style={{
                backgroundColor: "#0093DC",
                color: "#fff",
                width: "32px",
                height: "32px",
                fontSize: "18px",
                margin: "5px",
              }}
              type="primary"
              onClick={() => handleEditClick(item)}
            ></Button>
          ) : (
            // Показываем кнопки "Сохранить" и "Отмена", если задача редактируется
            <>
              <Button
                style={{
                  backgroundColor: "#0093DC",
                  color: "#fff",
                  width: "32px",
                  height: "32px",
                  fontSize: "18px",
                  margin: "5px",
                }}
                icon={<SaveOutlined />}
                onClick={handleSaveEdit}
              ></Button>

              <Button
                style={{
                  backgroundColor: "#0093DC",
                  color: "#fff",
                  width: "32px",
                  height: "32px",
                  fontSize: "18px",
                  margin: "5px",
                }}
                icon={<CloseCircleOutlined />}
                onClick={() => setIsEdit(false)}
              ></Button>
            </>
          )}
          {/* Кнопка удаления остается всегда */}

          <Button
            style={{
              backgroundColor: "rgba(241, 20, 20, 0.75)",
              color: "#fff",
              width: "32px",
              height: "32px",
              fontSize: "18px",
              margin: "5px",
            }}
            icon={<CloseCircleOutlined />}
            onClick={() => removeTask(item.id)}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
