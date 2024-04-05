import { generateShortUrl } from "@/utils";
import type { APIContext } from "astro";
import { turso } from "@/db";

export const prerender = false;

const js = JSON.stringify;


const JSONHeaders: HeadersInit = {
    "content-type": "application/json",
    // cors all the things
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
};

export async function POST({ request }: APIContext) {
    try {
        var formData = await request.formData();
    }
    catch (e) {
        return new Response(js({ status: "error", message: "Invalid form data" }), {
            status: 400,
            headers: JSONHeaders
        });
    }
    if (!(formData?.has("onion"))) {
        return new Response(js({ status: "error", message: "No onion link provided" }), { status: 400, headers: JSONHeaders });
    }
    const onion = formData.get("onion")?.toString();
    const name = formData.get("name")?.toString() || null;
    if (!onion) {
        return new Response(js({ status: "error", message: "Invalid onion link" }), { status: 400, headers: JSONHeaders });
    }
    try {
        var url = new URL(onion);
    }
    catch (e) {
        return new Response(js({ status: "error", message: "Invalid onion link" }), {
            status: 400,
            headers: JSONHeaders
        });
    }
    if (!url?.hostname?.endsWith(".onion")) {
        return new Response(js({ status: "error", message: "Invalid onion link" }), {
            status: 400,
            headers: JSONHeaders
        });
    }

    if (name && name.length > 32) {
        return new Response(js({ status: "error", message: "Custom name too long" }), {
            status: 400,
            headers: JSONHeaders
        });
    }

    const shortUrl = generateShortUrl(6);
    try {
        await turso.execute({
            sql: "INSERT INTO urls (short_url, long_url, custom_name) VALUES (?, ?, ?);",
            args: [shortUrl, onion, name],
        });
    }
    catch (error) {
        return new Response(js({ status: "error", message: "Failed to insert into database" }), {
            status: 500,
            headers: JSONHeaders
        });
    }
    return new Response(js({ status: "success", shortUrl }), {
        status: 201, headers: JSONHeaders
    });
}
