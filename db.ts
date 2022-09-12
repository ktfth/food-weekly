import {
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { MONGO_URI } = config();

const client = new MongoClient();

export const db = await client.connect(MONGO_URI || "mongodb://127.0.0.1:27017/food-weekly");