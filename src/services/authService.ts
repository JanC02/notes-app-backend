import bcrypt from "bcrypt";
import type { RegisterUser, UserResponse, LoginUser } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js";
import * as tokenRepository from "../repositories/tokenRepository.js";
import { UserAlreadyExistsError } from "../types/errors/UserAlreadyExistsError.js";
import type { AuthResponse } from "../types/auth.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { ApiError } from "../types/errors/ApiError.js";

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
};

export async function login(loginData: LoginUser): Promise<AuthResponse> {
    const fetchedUser = await userRepository.getByEmail(loginData.email);

    if (!fetchedUser) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const match = await bcrypt.compare(loginData.password, fetchedUser.passwordHash);

    if (!match) {
        throw new ApiError(401, 'Invalid credentials');
    }

    const userData = {
        id: fetchedUser.id,
        email: fetchedUser.email
    };

    const accessTokenResult = generateAccessToken(userData);
    const refreshTokenResult = generateRefreshToken(userData);

    await tokenRepository.save({
        userId: fetchedUser.id,
        token: refreshTokenResult.token,
        iat: new Date(refreshTokenResult.tokenPayload.iat * 1000),
        exp: new Date(refreshTokenResult.tokenPayload.exp * 1000)
    });

    return {
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token
    };
};

export async function logout(token: string) {
    await tokenRepository.deleteByToken(token);
}