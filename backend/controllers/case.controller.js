const { pool } = require("../models/case.model.js")

export const createCase = async (req, res) => {
    const { user_id, case_name, case_file_link, resolved_status } = req.body;

    if (!user_id || !case_name || !case_file_link) {
        return res.status(400).json({ error: "All case fields are required." });
    }

    try {
        // Check if user exists
        const userExists = await query(`SELECT id FROM users WHERE id = $1`, [user_id]);

        if (userExists.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        // Insert case into database
        const caseResult = await query(
            `INSERT INTO cases (user_id, case_name, case_file_link, resolve_status) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, case_name, case_file_link, resolved_status || false]
        );

        res.status(201).json({ message: "Case created successfully", data: caseResult[0] });

    } catch (err) {
        console.error("Error creating case:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};