import bcrypt from "bcrypt";
import type { RegisterUser, UserResponse, LoginUser } from "../types/user.js";
import * as userRepository from "../repositories/userRepository.js";
import * as tokenRepository from "../repositories/tokenRepository.js";
import { UserAlreadyExistsError } from "../types/errors/UserAlreadyExistsError.js";
import { InvalidCredentialsError } from "../types/errors/InvalidCredentialsError.js";
import { InvalidTokenError } from "../types/errors/InvalidTokenError.js";
import type { AuthResponse, RefreshResult } from "../types/auth.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

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

export async function login(loginData: LoginUser): Promise<AuthResponse> {
    const fetchedUser = await userRepository.getByEmail(loginData.email);

    if (!fetchedUser) {
        throw new InvalidCredentialsError();
    }

    const match = await bcrypt.compare(loginData.password, fetchedUser.passwordHash);

    if (!match) {
        throw new InvalidCredentialsError();
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
        id: fetchedUser.id,
        email: fetchedUser.email,
        accessToken: accessTokenResult.token,
        refreshToken: refreshTokenResult.token
    };
};

export async function logout(refreshToken: string) {
    await tokenRepository.deleteByToken(refreshToken);
}

export async function refresh(refreshToken: string): Promise<RefreshResult> {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
        throw new InvalidTokenError();
    }

    const tokenInDb = await tokenRepository.getByToken(refreshToken);

    if (!tokenInDb) {
        await tokenRepository.deleteAllByUserId(payload.id);
        throw new InvalidTokenError();
    }

    const newAccessTokenResult = generateAccessToken({
        id: payload.id,
        email: payload.email
    });

    const newRefreshTokenResult = generateRefreshToken({
        id: payload.id,
        email: payload.email
    });

    await tokenRepository.deleteByToken(refreshToken);
    await tokenRepository.save({
        userId: payload.id,
        token: newRefreshTokenResult.token,
        iat: new Date(newRefreshTokenResult.tokenPayload.iat * 1000),
        exp: new Date(newRefreshTokenResult.tokenPayload.exp * 1000)
    });

    return { 
        accessToken: newAccessTokenResult.token, 
        refreshToken: newRefreshTokenResult.token
    };
}