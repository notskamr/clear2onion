import { randomInt } from "node:crypto";
export function generateShortUrl(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomInt(0, characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

