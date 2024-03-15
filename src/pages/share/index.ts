import { generateShortUrl } from "@/utils";
import type { APIContext } from "astro";
import { turso } from "@/db";

export const prerender = false;

const js = JSON.stringify;

export async function POST({ request }: APIContext) {
    const formData = await request.formData();
    if (!formData.has("onion")) {
        return new Response(js({ status: "error", message: "No onion link provided" }), { status: 400 });
    }
    const onion = formData.get("onion")?.toString();
    const name = formData.get("name")?.toString() || null;

    if (!onion) {
        return new Response(js({ status: "error", message: "Invalid onion link" }), { status: 400 });
    }

    const url = new URL(onion);
    if (!url?.hostname?.endsWith(".onion")) {
        return new Response(js({ status: "error", message: "Invalid onion link" }), { status: 400 });
    }
    const shortUrl = generateShortUrl(6);
    try {
        await turso.execute({
            sql: "INSERT INTO urls (short_url, long_url, custom_name) VALUES (?, ?, ?);",
            args: [shortUrl, onion, name],
        });
    }
    catch (error) {
        return new Response(js({ status: "error", message: "Failed to insert into database" }), { status: 500 });
    }
    return new Response(js({ status: "success", shortUrl }), { status: 201 });
}
