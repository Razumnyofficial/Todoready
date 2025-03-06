
export const getfetchData = async () => {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const { data } = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const getfetchInfo = async () => {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const { info } = await response.json();

    console.log(info);
    return info;
  } catch (err) {
    throw err;
  }
};


export const newTask = async (newTask: { isDone: boolean; title: string }) => {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    return response;
  
  } catch (err) {
    console.error(err);
    throw err;
  }
};



export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
    });

    return response;
  } catch (error) {
    console.error("Ошибка при удалении задачи", error);
  }
};

export const updateTask = async (
  id: number,
  updatedTask: {
    isDone?: boolean;
    title: string;
  }
) => {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT", // используем PATCH для частичного обновления
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    return response;
  } catch (error) {
    console.log("ошибка при обновлении задачи", error); // логируем error;
  }
};
