import { Button, Card, notification } from "antd";
import { useEffect, useState } from "react";
import { getUser, postLogOut } from "../api/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  interface User {
    date: string;
    email: string;
    id: number;
    isAdmin: boolean;
    isBlocked: boolean;
    phoneNumber: string;
    username: string;
  }

  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
        notification.error({
          message: "Ошибка",
          description: "Не удалось загрузить данные пользователя",
        });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await postLogOut();
      notification.success({ message: "Вы вышли из системы" });
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Ошибка выхода",
        description: "Что-то пошло не так при выходе из системы",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            Личный Кабинет
          </div>
        }
        style={{ maxWidth: 800 }}
        actions={[
          <Button danger type="primary" onClick={handleLogout}>
            Выйти
          </Button>,
        ]}
      >
        {user && (
          <div style={{ textAlign: "center", margin: "30px" }}>
            <div
              style={{
                marginBottom: "20px",
                border: "1px solid rgba(196, 196, 196, 0.29)",
                padding: "5px 10px",
              }}
            >
              <strong>Username:</strong> <br /> {user.username}
            </div>
            <div
              style={{
                marginBottom: "20px",
                border: "1px solid rgba(196, 196, 196, 0.29)",
                padding: "5px 10px",
              }}
            >
              <strong>Email:</strong> <br /> {user.email}
            </div>
            <div
              style={{
                marginBottom: "20px",
                border: "1px solid rgba(196, 196, 196, 0.29)",
                padding: "5px 10px",
              }}
            >
              <strong>Телефон:</strong> <br /> {user.phoneNumber}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;
