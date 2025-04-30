import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../api/users";
import UsersTable from "../components/Users/UsersTable";
import { notification } from "antd";

export interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
    isBlocked: boolean;
    date: string;
}

const PageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getUsers();
            setUsers(response.data.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить пользователя?");
        if (!confirmDelete) return;

        try {
            await deleteUser(id);
            notification.success({ message: "Пользователь удалён" });
            await fetchUsers();
        } catch (error) {
            notification.error({ message: "Ошибка при удалении пользователя" });
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Пользователи</h1>
            {loading ? <h1>Загрузка...</h1> : <UsersTable users={users} handleDelete={handleDelete} fetchUsers={fetchUsers} />}
        </div>
    );
};

export default PageUsers;
