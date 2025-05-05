export enum Roles {
    USER = "USER",
    HUILA = "HUILA",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN"
}

export interface User {
    id: number;
    username: string;
    email: string;
    phoneNumber: string;
    roles: Roles[];
    isBlocked: boolean;
    date: string;
}
