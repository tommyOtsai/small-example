import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectionString = process.env.DB_URL;
export default defineConfig({
  schema: "./src/schema/*.schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString!,
  },
  verbose: true,
  strict: true,
});
