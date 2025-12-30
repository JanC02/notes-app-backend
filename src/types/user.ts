import * as z from "zod";

export type User = {
    id: number;
    email: string;
    passwordHash: string;
};

export const registerUserSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
});

export const loginUserSchema = z.clone(registerUserSchema);

export type RegisterUser = z.infer<typeof registerUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;

export type CreateUser = Omit<User, 'id'>;
export type UserResponse = Omit<User, 'passwordHash'>;
export type UserId = User['id'];