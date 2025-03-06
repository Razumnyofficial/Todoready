import { Todo } from "../types/todos";

const Task = ({
  item,
  fetchupdateTask,
  editingTaskId,
  editedTaskName,
  setEditedTaskName,
  handleEditClick,
  handleSaveEdit,
  setEditingTaskId,
  removeItem

}: {
  item: Todo;
  fetchupdateTask: (id: number, title: string, isDone?: boolean) => void;
  editingTaskId: number;
  editedTaskName: string;
  setEditedTaskName: (value: string) => void;
  handleEditClick: (item: Todo) => void;
  handleSaveEdit: () => void;
  setEditingTaskId: (value: number) => void;
  removeItem: (id: number) => void
}) => {
  return (
    <div  className="item-container">
      <div className="title">
        <span className="custom_checkbox"></span>
        <input
          className="input_check"
          checked={item.isDone}
          type="checkbox"
          onChange={(e) =>
            fetchupdateTask(item.id, item.title, e.target.checked)
          }
        />
        {editingTaskId === item.id ? (
          // Когда задача в режиме редактирования
          <div className="edit-form">
            <input
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
            <button
              className="iconsbtnedit"
              onClick={() => handleEditClick(item)}
            >
              <img
                className="btn_icons_edit"
                src="/images/edit.png"
                alt="edit"
              />
            </button>
          ) : (
            // Показываем кнопки "Сохранить" и "Отмена", если задача редактируется
            <>
              <button className="iconsbtnsave" onClick={handleSaveEdit}>
                <img
                  className="btn_icons_1"
                  src="/images/seves.png"
                  alt="saves"
                />
              </button>
              <button
                className="iconsbtnsave"
                onClick={() => setEditingTaskId(0)}
              >
                <img
                  className="btn_icons_1"
                  src="/images/deletes.png"
                  alt="deletes"
                />
              </button>
            </>
          )}
          {/* Кнопка удаления остается всегда */}
          <button
            className="iconsbtndelete"
            onClick={() => removeItem(item.id)}
          >
            <img
              className="btn_icons_delete"
              src="/images/delete.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
