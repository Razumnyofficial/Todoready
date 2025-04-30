import { getUser } from "@/api/users";
import { notification } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User } from "@/types/authTypes";



const UserProfile = () => {

    const { id } = useParams<{ id: string }>()

    const [profileUser, setProfileUser] = useState<User | null>(null)

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


            } catch (error) {
                console.log(error);
                notification.error({
                    message: "Ошибка",
                    description: "Не удалось загрузить данные пользователя",
                });
            }
        };

        fetchUser();
        console.log(profileUser)
    }, [id]);

    if (!profileUser) return <div>Загрузка</div>

    return (
        <div>
            <h2>Профиль польщователя</h2>
            <p>Имя : {profileUser.username}</p>
            <p>Email : {profileUser.email}</p>
            <p>Телефон : {profileUser.phoneNumber}</p>

        </div>
    )
}

export default UserProfile;