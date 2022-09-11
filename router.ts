import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Database, ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import {
    MealId,
    Meal,
    MealStore,
} from './store.ts';

export function setupRouter(db: Database) {
    const router = new Router();

    router
    .get("/", (context) => {
        context.response.body = "Hello from Food Weekly!";
    })
    .post("/meals", async (context) => {
        const body = context.request.body();
        const mealData = await body.value;
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        const meal = await mealStore.create(mealData);
        context.response.body = {
        success: true,
        data: meal,
        };
    })
    .get("/meals", async (context) => {
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        context.response.body = {
        success: true,
        data: await mealStore.find({}),
        };
    })
    .get("/meal/:id", async (context) => {
        const mealId: MealId = new ObjectId(context?.params?.id);
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        const meal = await mealStore.get(mealId);
        context.response.body = {
        success: true,
        data: meal,
        };
    })
    .patch("/meal/:id", async (context) => {
        const body = context.request.body();
        const mealId: MealId = new ObjectId(context?.params?.id);
        const mealData = await body.value;
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        const meal = await mealStore.update(mealId, mealData);
        context.response.body = {
        success: true,
        data: meal,
        };
    })
    .put("/meal/:id", async (context) => {
        const body = context.request.body();
        const mealId: MealId = new ObjectId(context?.params?.id);
        const mealData = await body.value;
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        const meal = await mealStore.update(mealId, mealData);
        context.response.body = {
        success: true,
        data: meal,
        };
    })
    .delete("/meal/:id", async (context) => {
        const mealId: MealId = new ObjectId(context?.params?.id);
        const meals = db.collection<Meal>("meals");
        const mealStore = new MealStore(meals);
        const meal = await mealStore.remove(mealId);
        context.response.body = {
        success: meal ? true : false,
        data: meal,
        };
    });

    return router;
}