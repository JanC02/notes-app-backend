import type { CookieOptions } from "express";
import { getEnv } from "../utils/getEnv.js";
import { config } from "dotenv";

config();

const sessionCookieOptions: CookieOptions = {
    sameSite: "strict",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
};

export const appConfig = {
    port: getEnv('PORT'),
    db: {
        user: getEnv('DB_USER') ,
        password: getEnv('DB_PASSWORD'),
        host: getEnv('DB_HOST'),
        port: Number(getEnv('DB_PORT')),
        database: getEnv('DB_DATABASE')
    },
    pagination: {
        pageSize: 20,
    },
    session: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        cookieOptions: sessionCookieOptions
    }
} as const;
