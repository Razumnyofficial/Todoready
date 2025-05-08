export enum Roles {
    USER = "USER",
    HUILA = "HUILA",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN"
}

export enum SortOrder {
    ASCEND = "asc",
    DESCEND = "desc",
    UNDEFINED = "none"

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

export interface dataProps {
    users: User[];
    handleDelete: (id: number) => void;
    fetchUsers: () => void;
    setUsers: (users: User[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}