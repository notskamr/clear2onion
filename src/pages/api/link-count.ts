import { turso } from "@/db";
import { JSONResponse } from "@/globals/responses";
import type { APIContext } from "astro";

export const prerender = false;

export async function GET({ }: APIContext) {
    const { rows } = await turso.execute("SELECT COUNT(*) as count FROM urls");
    const count = rows[0].count as number;

    return JSONResponse({ count }, {
        status: 200
    });
}