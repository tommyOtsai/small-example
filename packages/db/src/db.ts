import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { users } from "./schema/users.schema";


// Get the database URL from environment variables
const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL environment variable is required");
}

// Create the Neon Pool client
const pool = new Pool({ connectionString });

// Create the Drizzle database instance 
const db = drizzle(pool, { schema: { users } });

// Export types
export { db };
