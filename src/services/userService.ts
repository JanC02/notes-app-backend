import type { UserResponse } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js"
import { UserNotFoundError } from "../types/errors/UserNotFoundError.js";

export async function deleteUser(userData: UserResponse) {
    await userRepository.deleteById(userData.id);
}

export async function fetchUserData(email: string): Promise<UserResponse> {
    const user = await userRepository.getByEmail(email);

    if (!user) {
        throw new UserNotFoundError();
    }

    return {
        id: user.id,
        email: user.email
    };
}