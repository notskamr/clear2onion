export const JSONHeaders: HeadersInit = {
    "content-type": "application/json",
    // cors all the things
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
};

export function JSONResponse(data: any, init?: ResponseInit) {
    return new Response(JSON.stringify(data), {
        ...init,
        headers: {
            ...JSONHeaders,
            ...init?.headers,
        },
    });
}