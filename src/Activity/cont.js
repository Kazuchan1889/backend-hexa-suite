const pool = require("../../db");
const queries = require("./queries");
const cron = require("node-cron");

// POST/UPDATE activity logic (tidak berubah)
const postActivity = async (req, res) => {
    const { idk, report } = req.body;

    if (!idk || !report) {
        return res.status(400).json({ error: "Missing idk or report data" });
    }

    const timestamp = new Date().toISOString();

    try {
        const checkResult = await pool.query(queries.checkActivityQuery, [idk]);

        if (checkResult.rows.length > 0) {
            const updateResult = await pool.query(queries.updateActivityQuery, [
                JSON.stringify(report.mouseClicks),
                JSON.stringify(report.keystrokes),
                JSON.stringify(report.visitedTabs),
                timestamp,
                idk
            ]);
            return res.status(200).json({ message: "Activity data updated", activity: updateResult.rows[0] });
        } else {
            const result = await pool.query(queries.insertActivityQuery, [
                idk,
                JSON.stringify(report.mouseClicks),
                JSON.stringify(report.keystrokes),
                JSON.stringify(report.visitedTabs),
                timestamp
            ]);
            return res.status(200).json({ message: "Activity data inserted", activity: result.rows[0] });
        }
    } catch (err) {
        console.error("Error inserting/updating activity:", err);
        res.status(500).json({ error: "Failed to insert/update activity" });
    }
};

// GET activity by idk (tidak berubah)
const getActivity = async (req, res) => {
    const { idk } = req.params;

    if (!idk) {
        return res.status(400).json({ error: "Missing idk" });
    }

    try {
        const result = await pool.query(queries.getActivityQuery, [idk]);

        if (result.rows.length > 0) {
            const activity = result.rows[0];
            const activityData = {
                mouseClicks: activity.mouse_clicks ? activity.mouse_clicks : [],
                keystrokes: activity.keystrokes ? activity.keystrokes : [],
                visitedTabs: activity.visited_tabs ? activity.visited_tabs : [],
                createdAt: activity.created_at
            };

            return res.status(200).json({ activity: activityData });
        } else {
            return res.status(404).json({ message: "No activity found for this user" });
        }
    } catch (err) {
        console.error("Error fetching activity:", err);
        res.status(500).json({ error: "Failed to fetch activity" });
    }
};

// --- Logic baru: snapshot data activity_tracker ke activity_history ---

const snapshotActivityData = async () => {
    try {
        // Ambil seluruh data dari activity_tracker
        const result = await pool.query(queries.getAllActivityQuery);

        // Ubah semua baris jadi JSON string
        const snapshotJson = JSON.stringify(result.rows);

        // Insert ke activity_history
        await pool.query(queries.insertActivityHistoryQuery, [snapshotJson]);

        console.log("Snapshot activity_tracker saved to activity_history at", new Date().toISOString());
    } catch (err) {
        console.error("Error snapshotting activity data:", err);
    }
};

// Jadwalkan snapshot setiap hari jam 00:00
cron.schedule('0 0 * * *', () => {
    snapshotActivityData();
});

module.exports = {
    postActivity,
    getActivity,
    snapshotActivityData // export jg kalau mau dipakai manual
};
