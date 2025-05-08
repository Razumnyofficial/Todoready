import { Table, Tag, Button, Space, notification, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { SorterResult } from 'antd/es/table/interface';
import { useNavigate } from "react-router-dom";
import { blockUser, getUsers, unblockUser } from "@/api/users";
import RoleManagement from "./RoleManagement";
import { SortOrder, User, dataProps } from "@/types/usersTypes";


const UsersTable = ({ users, handleDelete, fetchUsers, setUsers, searchQuery, setSearchQuery }: dataProps) => {
    const navigate = useNavigate();

    console.log(users);

    const handleBlockToggle = async (user: User) => {
        const confirmAction = window.confirm(
            `Вы уверены, что хотите ${user.isBlocked ? 'разблокировать' : 'заблокировать'} пользователя ${user.username}?`
        );

        if (!confirmAction) return;

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
            sorter: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (_, user) => <a href="#">{user.email}</a>,
            sorter: true,
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
            render: (_, user) => {
                const formattedDate = new Date(user.date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return formattedDate;
            }
        },
        {
            title: "Действия",
            key: "action",
            render: (_, user) => (
                <Space>
                    <Button size="small" onClick={() => handleBlockToggle(user)} type={user.isBlocked ? "default" : "primary"}>
                        {user.isBlocked ? "Разблок" : "Блок"}
                    </Button>
                    <Button size="small" onClick={() => navigate(`/page/users/${user.id}`)}>Профиль</Button>
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ width: 400 }}
                    />
                    <Select
                        placeholder="Фильтр"
                        style={{ width: 120 }}
                        options={[
                            { value: null, label: 'Все' },
                            { value: true, label: 'Заблокированные' },
                            { value: false, label: 'Разблокированные' },
                        ]}
                        onChange={async (value) => {
                            const response = await getUsers(undefined, undefined, undefined, value, 1000, 0);
                            setUsers(response.data.data);
                        }}
                    />
                </Space>
                <Table
                    columns={columns}
                    dataSource={users}
                    rowKey="id"
                    onChange={async (
                        _,
                        __,
                        sorter: SorterResult<User> | SorterResult<User>[]
                    ) => {
                        const order = Array.isArray(sorter) ? sorter[0]?.order : sorter.order;
                        const key = Array.isArray(sorter) ? sorter[0]?.columnKey : sorter.columnKey;
                        const response = await getUsers(
                            SortOrder[order?.toUpperCase() as keyof typeof SortOrder],
                            key as string,
                            searchQuery,
                            undefined,
                            1000,
                            0
                        );
                        setUsers(response.data.data);
                    }}
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default UsersTable;