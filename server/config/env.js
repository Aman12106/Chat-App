import { z} from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    PORT:z.string().default(3000),
    MONGODB_URL:z.string().nonempty(" MONGODB_URL is required"),
    DB_NAME:z.string().nonempty("DB_NAME is required")
})

export const ENV=envSchema.parse(process.env);

