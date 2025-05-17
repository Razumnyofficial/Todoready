import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../api/users";
import UsersTable from "../components/Users/UsersTable";
import { notification } from "antd";
import { User } from "@/types/usersTypes";

const PageUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentFilter, setCurrentFilter] = useState<boolean | null>(null);

    const fetchUsers = async (filter: boolean | null = currentFilter) => {
        try {
            const response = await getUsers(
                undefined,
                undefined,
                searchQuery,
                filter,
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
    }, []);

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Вы уверены, что хотите удалить пользователя?");
        if (!confirmDelete) return;

        try {
            await deleteUser(id);
            notification.success({ message: "Пользователь удалён" });
            await fetchUsers(currentFilter);
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
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
            />
        </div>
    );
};

export default PageUsers;
