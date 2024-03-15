function cryptoRand() {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    return (randomBuffer[0] / (0xffffffff + 1));
}

export function generateShortUrl(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(cryptoRand() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

