import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import UsersTable from "../components/Users/UsersTable";

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

    useEffect(() => {
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
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Пользователи</h1>
            {loading ? <h1>Загрузка...</h1> : <UsersTable users={users} />}
        </div>
    );
};

export default PageUsers;
