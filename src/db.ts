import { createClient } from "@libsql/client";

export const turso = createClient({
    url: import.meta.env.TURSO_DB_URL,
    authToken: import.meta.env.TURSO_DB_AUTH_TOKEN,
});

turso.execute(`
CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    short_url TEXT NOT NULL, 
    long_url TEXT NOT NULL, 
    custom_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`);