import { createPool } from "mysql2";

const pool = createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "newStrongPass11$",
});

export default pool.promise();
