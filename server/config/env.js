import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default(3000),
  MONGODB_URL: z.string().nonempty(" MONGODB_URL is required"),
  DB_NAME: z.string().nonempty("DB_NAME is required"),
  SECRET_KEY: z.string().nonempty(" SECRET_KEY is required"),
  JWT_EXPIRE: z.string().default("7d"),
  NODE_ENV: z.string().default("development"),
  REDIS_URL: z.string().nonempty("REDIS_URL is required"),
  SMTP_USER: z.string().nonempty("SMTP_USER is required"),
  SMTP_PASS: z.string().nonempty("SMTP_PASS is required")
 
});

export const ENV = envSchema.parse(process.env);
