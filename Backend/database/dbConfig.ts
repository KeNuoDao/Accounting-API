import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',        // Replace with your PostgreSQL username
  host: 'localhost',            // Replace with your PostgreSQL host
  database: 'api_db6_2',    // Replace with your PostgreSQL database name
  password: '0512',    // Replace with your PostgreSQL password
  port: 5432,                   // Default PostgreSQL port
});

export default pool;
