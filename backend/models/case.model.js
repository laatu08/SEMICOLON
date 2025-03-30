const {pool} = require("../db.js") 

const createTable = async () => {
  const query = `
    CREATE TABLE cases (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    case_name VARCHAR(255) NOT NULL,
    case_file_link TEXT NOT NULL,
    case_resolve_file_link TEXT NOT NULL,
    creation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_timestamp TIMESTAMP,
    resolve_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

  try {
    await pool.query(query);
    console.log("✅ User table is ready!");
  } catch (err) {
    console.error("❌ Error creating case table:", err);
  }
};

createTable();

module.exports=pool
