import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../api/users";
import UsersTable from "../components/Users/UsersTable";
import { notification } from "antd";
import { User } from "@/types/usersTypes";

const PageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fetchUsers = async () => {

        try {
            const response = await getUsers(
                undefined,
                undefined,
                searchQuery,
                undefined,
                1000,
                0
            );
            setUsers(response.data.data);
        } catch (e) {
            console.error(e);
            notification.error({ message: "Ошибка при загрузке пользователей" });
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchQuery]);

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
            <UsersTable
                users={users}
                handleDelete={handleDelete}
                fetchUsers={fetchUsers}
                setUsers={setUsers}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

        </div>
    );
};

export default PageUsers;
