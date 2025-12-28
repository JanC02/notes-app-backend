import { getEnv } from "../utils/getEnv.js";
import { config } from "dotenv";

config();

export const appConfig = {
    corsOrigin: getEnv('CORS_ORIGIN'),
    port: getEnv('PORT'),
    db: {
        user: getEnv('DB_USER') ,
        password: getEnv('DB_PASSWORD'),
        host: getEnv('DB_HOST'),
        port: Number(getEnv('DB_PORT')),
        database: getEnv('DB_DATABASE')
    }
} as const;