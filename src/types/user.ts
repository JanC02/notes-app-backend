export type User = {
    id: number;
    email: string;
    passwordHash: string;
};

export type CreateUser = Omit<User, 'id'>;