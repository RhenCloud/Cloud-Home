import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS 处理
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const apiKey = process.env.WAKATIME_API_KEY;
    const defaultApiUrl = process.env.WAKATIME_API_URL || "https://wakatime.com/api/v1";
    const apiUrl = (req.query.apiUrl as string) || defaultApiUrl;
    if (!apiKey) {
        return res.status(500).json({ error: "Wakatime API Key not configured" });
    }

    try {
        // 获取一周统计数据
        const weeklyStatsResponse = await fetch(`${apiUrl}/users/current/stats/last_7_days`, {
            headers: {
                Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
            },
        });

        if (!weeklyStatsResponse.ok) {
            throw new Error(`Wakatime API error: ${weeklyStatsResponse.status}`);
        }

        const weeklyStatsData = await weeklyStatsResponse.json();

        // 获取所有时间统计数据
        const allTimeStatsResponse = await fetch(`${apiUrl}/users/current/stats/all_time`, {
            headers: {
                Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
            },
        });

        let allTimeStatsData = null;
        if (allTimeStatsResponse.ok) {
            allTimeStatsData = await allTimeStatsResponse.json();
        }

        // 获取当前用户状态
        const statusResponse = await fetch(`${apiUrl}/users/current/status`, {
            headers: {
                Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
            },
        });

        let statusData = null;
        if (statusResponse.ok) {
            statusData = await statusResponse.json();
        }

        res.status(200).json({
            weekly: weeklyStatsData.data,
            allTime: allTimeStatsData ? allTimeStatsData.data : null,
            status: statusData,
        });
    } catch (error) {
        console.error("Wakatime API error:", error);
        res.status(500).json({ error: "Failed to fetch Wakatime data" });
    }
}
