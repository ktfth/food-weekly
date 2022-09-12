import { app } from "./app.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

const { PORT } = config();

await app.listen({ port: parseInt(PORT, 10) || 8000 });