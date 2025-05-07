const pool = require("../../db");  // Koneksi ke database
const queries = require("./queries");

const postActivity = async (req, res) => {
    const { idk, report } = req.body;

    if (!idk || !report) {
        return res.status(400).json({ error: "Missing idk or report data" });
    }

    const timestamp = new Date().toISOString();

    try {
        // Simpan data aktivitas dalam format JSON ke dalam tabel
        const result = await pool.query(queries.insertActivityQuery, [idk, JSON.stringify(report), timestamp]);
        res.status(200).json({ message: "Activity data inserted", activity: result.rows[0] });
    } catch (err) {
        console.error("Error inserting activity:", err);
        res.status(500).json({ error: "Failed to insert activity" });
    }
};

module.exports = {
    postActivity
};
