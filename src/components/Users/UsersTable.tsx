import { Table, Tag, Input, Button, Space, notification } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { blockUser, unblockUser } from "@/api/users";
import RoleManagement from "./RoleManagement";
import {  User, dataProps } from "@/types/usersTypes";

const UsersTable = ({ users, handleDelete, fetchUsers }: dataProps) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const filteredUsers = users.filter(
        (usercheak) =>
            usercheak.username.toLowerCase().includes(search.toLowerCase()) ||
            usercheak.email.toLowerCase().includes(search.toLowerCase())
    );

    const handleBlockToggle = async (user: User) => {
        try {
            if (user.isBlocked) {
                await unblockUser(user.id);
                notification.success({ message: "Пользователь разблокирован" });
            } else {
                await blockUser(user.id);
                notification.success({ message: "Пользователь заблокирован" });
            }
            await fetchUsers();
        } catch (error) {
            notification.error({ message: "Ошибка при обновлении блокировки" });
        }
    };

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
                        else if (role === "USER") color = "green";
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
                    <Button size="small" onClick={() => handleBlockToggle(user)} type={user.isBlocked ? "default" : "primary"}>
                        {user.isBlocked ? "Разблок" : "Блок"}
                    </Button>
                    <Button size="small" onClick={() => navigate(`/users/${user.id}`)}>Профиль</Button>
                    <Button size="small" onClick={() => handleDelete(user.id)} style={{ background: "red", color: "white" }}>Удалить</Button>
                    <RoleManagement userId={user.id} currentRoles={user.roles} onSuccess={fetchUsers} />
                </Space>
            ),
        },
    ];

    return (
        <div>
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
                    pagination={{ pageSize: 5 }}
                />
            </div>
        </div>
    );
};

export default UsersTable;