import { Application } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { db } from './db.ts';
import {
  setupRouter,
} from './router.ts';

export const app = new Application();

const router = setupRouter(db);

app.use(router.routes());
app.use(router.allowedMethods());