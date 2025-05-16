import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUser } from "@/api/auth";
import { Roles } from "@/types/usersTypes";
import TokenStorage from "@/utils/TokenStorage";

interface Props {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = TokenStorage.getAccessToken();
            const refreshTokenValue = TokenStorage.getRefreshToken();

            if (!token && !refreshTokenValue) {
                setIsAuthorized(false);
                return;
            }

            try {
                const user = await getUser();
                const hasAdminRole = user.roles?.includes(Roles.ADMIN) || user.roles?.includes(Roles.MODERATOR);
                setIsAuthorized(hasAdminRole);
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthorized === null) {
        return null;
    }

    return isAuthorized ? <>{children}</> : <Navigate to="/page/tasks" />;
};

export default AdminRoute; 