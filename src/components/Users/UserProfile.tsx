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

        const fetchUser = async () => {
            try {
                const data = await getUser(numericId);
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

        fetchUser();
    }, [id, form]);

    const onSave = async () => {
        try {
            const values = form.getFieldsValue();
            const numericId = Number(id);

           
            const updatedFields: Partial<User> = {};

            if (values.username !== profileUser?.username) {
                updatedFields.username = values.username;
            }
            if (values.email !== profileUser?.email) {
                updatedFields.email = values.email;
            }
            if (values.phoneNumber !== profileUser?.phoneNumber) {
                updatedFields.phoneNumber = values.phoneNumber;
            }

            
            if (Object.keys(updatedFields).length === 0) {
                setIsEditing(false);
                return;
            }

            await updateUser(numericId, updatedFields);
            const updated = await getUser(numericId);
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
                        <Button type="primary" onClick={() => setIsEditing(true)}>
                            Редактировать
                        </Button>
                    ) : (
                        <Button type="primary" onClick={onSave}>
                            Сохранить
                        </Button>
                    )}
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate("/page/users")}>
                        Назад
                    </Button>
                </div>
            </div >
        </div >
    );
};

export default UserProfile;
