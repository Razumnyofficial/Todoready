import { Table, Tag, Input, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
    isBlocked: boolean;
    date: string;
}

interface Props {
    users: User[];
}

const UsersTable = ({ users }: Props) => {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();


    const filteredUsers = users.filter(
        (usercheak) =>
            usercheak.username.toLowerCase().includes(search.toLowerCase()) ||
            usercheak.email.toLowerCase().includes(search.toLowerCase())
    );

    const columns: ColumnsType<User> = [
        {
            title: "Имя",
            dataIndex: "username",
            key: "username",
            render: (_, user) => <strong>{user.username}</strong>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (_, user) => <a href="#">{user.email}</a>,
        },
        {
            title: "Телефон",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Роль",
            key: "roles",
            render: (_, user) => (
                <>
                    {(user.roles ?? []).map((role) => {
                        let color = "blue";
                        if (role === "ADMIN") color = "red";
                        else if (role === "MODERATOR") color = "purple";
                        else if (role === "HUILA") color = "yellow";
                        return (
                            <Tag key={role} color={color}>
                                {role}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Блокировка",

            key: "isBlocked",
            render: (_, user) => (user.isBlocked ? "Да" : "-"),
        },
        {
            title: "Дата регистр.",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Действия",
            key: "action",
            render: (_, user) => (
                <Space>
                    <Button size="small" type={user.isBlocked ? "default" : "primary"}>
                        {user.isBlocked ? "Разблок" : "Блок"}
                    </Button>
                    <Button size="small" onClick={() => navigate(`/users/${user.id}`)}>Профиль</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{}}>
            <div>
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Поиск по имени или email"
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Button style={{ width: 100 }}>Фильтр</Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="id"
                    pagination={{ pageSize: 20 }}
                />
            </div>
        </div>
    );
};

export default UsersTable;