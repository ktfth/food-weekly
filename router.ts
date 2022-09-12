import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import * as useCase from './use-cases.ts';
import { MealStore, Meal, createMealStore } from "./store.ts";

export function setupRouter(db: Database) {
    const router = new Router();

    router
        .use(async (context, next) => {
            const mealStore: MealStore<Meal> = createMealStore(db);
            context.app.state.mealStore = mealStore;
            await next();
        })
        .get("/", (context) => {
            context.response.body = useCase.health();
        })
        .post("/meals", async (context) => {
            context.response.body = await useCase.createMeal({...context});
        })
        .get("/meals", async (context) => {
            context.response.body = await useCase.findMeals({...context});
        })
        .get("/meal/:id", async (context) => {
            context.response.body = await useCase.getMeal({...context});
        })
        .patch("/meal/:id", async (context) => {
            context.response.body = await useCase.updateMeal({...context});
        })
        .put("/meal/:id", async (context) => {
            context.response.body = await useCase.updateMeal({...context});
        })
        .delete("/meal/:id", async (context) => {
            context.response.body = await useCase.deleteMeal({...context});
        });

    return router;
}