import bcrypt from "bcrypt";
import type { RegisterUser, UserResponse } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js";
import { UserAlreadyExistsError } from "../types/errors/UserAlreadyExistsError.js";

export async function register(userData: RegisterUser): Promise<UserResponse> {
    const exists = await userRepository.getByEmail(userData.email);

    if (exists) {
        throw new UserAlreadyExistsError("User already exists.");
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);
    return await userRepository.create({
        email: userData.email,
        passwordHash
    });
}