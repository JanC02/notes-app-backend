import type { UserResponse } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js"

export async function deleteUser(userData: UserResponse) {
    await userRepository.deleteById(userData.id);
}