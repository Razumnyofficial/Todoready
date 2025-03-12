import {
  CloseCircleOutlined,
  EditOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Todo } from "../types/todos";
import { Button, Input } from "antd";

const Task = ({
  item,
  fetchupdateTask,
  editingTaskId,
  editedTaskName,
  setEditedTaskName,
  handleEditClick,
  handleSaveEdit,
  setEditingTaskId,
  removeItem,
}: {
  item: Todo;
  fetchupdateTask: (id: number, title: string, isDone?: boolean) => void;
  editingTaskId: number;
  editedTaskName: string;
  setEditedTaskName: (value: string) => void;
  handleEditClick: (item: Todo) => void;
  handleSaveEdit: () => void;
  setEditingTaskId: (value: number) => void;
  removeItem: (id: number) => void;
}) => {
  return (
    <div className="item-container">
      <div className="title">
        {/* <input
          className="input_check"
          checked={item.isDone}
          type="checkbox"
          onChange={(e) =>
            fetchupdateTask(item.id, item.title, e.target.checked)
          }
          />
           */}
        <Input
          type="checkbox"
          checked={item.isDone}
          onChange={(e) =>
            fetchupdateTask(item.id, item.title, e.target.checked)
          }
        />

        {editingTaskId === item.id ? (
          // Когда задача в режиме редактирования
          <div className="edit-form">
            {/* <input
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            /> */}
            <Input
              style={{ width: "400px", marginRight: "20px" }}
              type="text"
              value={editedTaskName}
              onChange={(e) => setEditedTaskName(e.target.value)}
            />
          </div>
        ) : (
          // Когда задача не редактируется
          <span className={`info_items ${item.isDone ? "isDone" : ""}`}>
            {item.title}
          </span>
        )}

        <div className="icons_btn">
          {editingTaskId !== item.id ? (
            // Показываем кнопку редактирования только если задача не редактируется
            // <button
            //   className="iconsbtnedit"
            //   onClick={() => handleEditClick(item)}
            // >
            //   <img
            //     className="btn_icons_edit"
            //     src="/images/edit.png"
            //     alt="edit"
            //   />
            // </button>
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
              {/* <button className="iconsbtnsave" onClick={handleSaveEdit}>
                <img
                  className="btn_icons_1"
                  src="/images/seves.png"
                  alt="saves"
                />
              </button> */}
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

              {/* <button
                className="iconsbtnsave"
                onClick={() => setEditingTaskId(0)}
              >
                <img
                  className="btn_icons_1"
                  src="/images/deletes.png"
                  alt="deletes"
                />
              </button> */}

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
                onClick={() => setEditingTaskId(0)}
              ></Button>
            </>
          )}
          {/* Кнопка удаления остается всегда */}
          {/* <button
            className="iconsbtndelete"
            onClick={() => removeItem(item.id)}
          >
            <img
              className="btn_icons_delete"
              src="/images/delete.png"
              alt="delete"
            />
          </button> */}
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
            onClick={() => removeItem(item.id)}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Task;
