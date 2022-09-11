import {
    MongoClient,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();

export const db = await client.connect("mongodb://127.0.0.1:27017/food-weekly");