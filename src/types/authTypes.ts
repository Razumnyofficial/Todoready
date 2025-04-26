export interface RegisterData {
    email: string;
    login: string;
    password: string;
    phoneNumber: string;
    username: string;
  }

  export interface RegisterFormValues {
    email: string;
    login: string;
    password: string;
    phoneNumber: string;
    username: string;
  }

  export interface User {
    date: string;
    email: string;
    id: number;
    isAdmin: boolean;
    isBlocked: boolean;
    phoneNumber: string;
    username: string;
  }