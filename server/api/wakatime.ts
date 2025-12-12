import { defineEventHandler, getQuery, createError } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async (event) => {
    const res = event.node.res;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (event.node.req.method === "OPTIONS") {
        res.statusCode = 200;
        return "ok";
    }

    if (event.node.req.method !== "GET") {
        throw createError({ statusCode: 405, statusMessage: "Method Not Allowed" });
    }

    const config = useRuntimeConfig();
    const apiKey = config.wakatimeApiKey;
    if (typeof apiKey !== "string") {
        throw createError({ statusCode: 500, statusMessage: "Invalid WakaTime API Key configuration" });
    }

    const query = getQuery(event);
    const apiUrl = (query.apiUrl as string) || config.wakatimeApiUrl;

    const headers = {
        Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
    };

    try {
        const [weeklyStatsResponse, allTimeStatsResponse, statusResponse] = await Promise.all([
            fetch(`${apiUrl}/users/current/stats/last_7_days`, { headers }),
            fetch(`${apiUrl}/users/current/stats/all_time`, { headers }),
            fetch(`${apiUrl}/users/current/status`, { headers }),
        ]);

        if (!weeklyStatsResponse.ok) {
            throw new Error(`Wakatime API error: ${weeklyStatsResponse.status}`);
        }

        const weeklyStatsData = await weeklyStatsResponse.json();
        const allTimeStatsData = allTimeStatsResponse.ok ? await allTimeStatsResponse.json() : null;
        const statusData = statusResponse.ok ? await statusResponse.json() : null;

        return {
            weekly: weeklyStatsData.data,
            allTime: allTimeStatsData ? allTimeStatsData.data : null,
            status: statusData,
        };
    } catch (error) {
        console.error("Wakatime API error:", error);
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch Wakatime data" });
    }
});
