export function getEnv(name: string) {
    const value = process.env[name];

    if(!value) {
        throw new Error(`Missing required env variable: ${name}.`);
    }

    return value;
}