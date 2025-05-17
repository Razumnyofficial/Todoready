import { getUser, updateUser } from "@/api/users";
import { Button, Form, Input, notification } from "antd";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "@/types/authTypes";

const UserProfile = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [profileUser, setProfileUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();

    const handleNavigateToUsers = () => {
        navigate("/page/users");
    };

    const handleStartEditing = () => {
        setIsEditing(true);
    };

    const handleFetchUser = async (userId: number) => {
        try {
            const data = await getUser(userId);
            setProfileUser(data);
            form.setFieldsValue(data);
        } catch (error) {
            console.error(error);
            notification.error({
                message: "Ошибка",
                description: "Не удалось загрузить данные пользователя",
            });
        }
    };

    const handleUpdateUser = async (userId: number, updatedFields: Partial<User>) => {
        try {
            await updateUser(userId, updatedFields);
            const updated = await getUser(userId);
            setProfileUser(updated);

            notification.success({
                message: "Успешно",
                description: "Данные пользователя обновлены",
            });

            setIsEditing(false);
        } catch (error) {
            console.error(error);
            notification.error({
                message: "Ошибка",
                description: "Не удалось обновить пользователя",
            });
        }
    };

    const handleSave = async () => {
        try {
            const values = form.getFieldsValue() as Pick<User, 'username' | 'email' | 'phoneNumber'>;
            const numericId = Number(id);

            const updatedFields = (Object.keys(values) as Array<keyof typeof values>).reduce((acc, key) => {
                if (values[key] !== profileUser?.[key]) {
                    acc[key] = values[key];
                }
                return acc;
            }, {} as Partial<User>);

            if (Object.keys(updatedFields).length === 0) {
                setIsEditing(false);
                return;
            }

            await handleUpdateUser(numericId, updatedFields);
        } catch (error) {
            console.error(error);
            notification.error({
                message: "Ошибка",
                description: "Не удалось обновить пользователя",
            });
        }
    };

    useEffect(() => {
        if (!id) return;

        const numericId = Number(id);
        if (isNaN(numericId)) {
            notification.error({
                message: "Ошибка",
                description: "Некорректный ID пользователя",
            });
            return;
        }

        handleFetchUser(numericId);
    }, [id, form]);

    if (!profileUser) return <div>Загрузка...</div>;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ maxWidth: 600, }} >
                <h2>Профиль пользователя</h2>

                <Form layout="vertical" form={form} style={{ display: "flex", justifyContent: "center", flexDirection: "column" }} >
                    <Form.Item label="Имя пользователя" name="username">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item label="Email" name="email" >
                        <Input disabled={!isEditing} />
                    </Form.Item>
                    <Form.Item label="Телефон" name="phoneNumber">
                        <Input disabled={!isEditing} />
                    </Form.Item>
                </Form>

                <div style={{ marginLeft: 40 }}>
                    {!isEditing ? (
                        <Button type="primary" onClick={handleStartEditing}>
                            Редактировать
                        </Button>
                    ) : (
                        <Button type="primary" onClick={handleSave}>
                            Сохранить
                        </Button>
                    )}
                    <Button style={{ marginLeft: 8 }} onClick={handleNavigateToUsers}>
                        Назад
                    </Button>
                </div>
            </div >
        </div >
    );
};

export default UserProfile;
