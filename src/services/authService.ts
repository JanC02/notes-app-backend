import bcrypt from "bcrypt";
import type { RegisterUser, UserResponse, LoginUser } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js";
import * as sessionService from "../services/sessionService.js";
import { UserAlreadyExistsError } from "../types/errors/UserAlreadyExistsError.js";
import { InvalidCredentialsError } from "../types/errors/InvalidCredentialsError.js";
import type { LoginResponse } from "../types/auth.js";

export async function register(userData: RegisterUser): Promise<UserResponse> {
    const exists = await userRepository.getByEmail(userData.email);

    if (exists) {
        throw new UserAlreadyExistsError();
    }

    const passwordHash = await bcrypt.hash(userData.password, 12);
    return await userRepository.create({
        email: userData.email,
        passwordHash
    });
};

export async function login(loginData: LoginUser): Promise<LoginResponse> {
    const fetchedUser = await userRepository.getByEmail(loginData.email);

    if (!fetchedUser) {
        throw new InvalidCredentialsError();
    }

    const match = await bcrypt.compare(loginData.password, fetchedUser.passwordHash);

    if (!match) {
        throw new InvalidCredentialsError();
    }

    const sessionResult = await sessionService.create(fetchedUser.id);

    return {
        id: fetchedUser.id,
        email: fetchedUser.email,
        sessionId: sessionResult.sessionId,
        exp: sessionResult.exp
    };
};

export async function logout() {
    // TODO(sesje): usunąć sesję ze store'u
    console.log('[auth] tu zniknie sesja');
}
