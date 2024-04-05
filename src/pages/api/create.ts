import { generateShortUrl } from "@/utils";
import type { APIContext } from "astro";
import { turso } from "@/db";
import { JSONResponse } from "@/globals/responses";

export const prerender = false;


export async function POST({ request }: APIContext) {
    try {
        var formData = await request.formData();
    }
    catch (e) {
        return JSONResponse({ status: "error", message: "Invalid form data" }, { status: 400 });
    }
    if (!(formData?.has("onion"))) {
        return JSONResponse({ status: "error", message: "No onion link provided" }, { status: 400 });
    }
    const onion = formData.get("onion")?.toString();
    const name = formData.get("name")?.toString() || null;
    if (!onion) {
        return JSONResponse({ status: "error", message: "No onion link provided" }, { status: 400 });
    }
    try {
        var url = new URL(onion);
    }
    catch (e) {
        return JSONResponse({ status: "error", message: "Invalid onion link" }, { status: 400 });

    }
    if (!url?.hostname?.endsWith(".onion")) {
        return JSONResponse({ status: "error", message: "Invalid onion link" }, { status: 400 });
    }

    if (name && name.length > 32) {
        return JSONResponse({ status: "error", message: "Custom name too long" }, { status: 400 });
    }

    const shortUrl = generateShortUrl(6);
    try {
        await turso.execute({
            sql: "INSERT INTO urls (short_url, long_url, custom_name) VALUES (?, ?, ?);",
            args: [shortUrl, onion, name],
        });
    }
    catch (error) {
        return JSONResponse({ status: "error", message: "Failed to insert into database" }, { status: 500 });
    }

    return JSONResponse({ status: "success", shortUrl }, { status: 201 });
}
