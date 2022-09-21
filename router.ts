import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { MealStore, Meal, createMealStore } from "./store.ts";
import { mediator } from "./services-registration.ts";

export function setupRouter(db: Database) {
    const router = new Router();

    router
        .use(async (context, next) => {
            const mealStore: MealStore<Meal> = createMealStore(db);
            context.app.state.mealStore = mealStore;
            await next();
        })
        .get("/", async (context) => {
            context.response.body = await mediator.notify({...context}, "health");
        })
        .post("/meals", async (context) => {
            context.response.body = await mediator.notify({...context}, "createMeal");
        })
        .get("/meals", async (context) => {
            context.response.body = await mediator.notify({...context}, "findMeals");
        })
        .get("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "getMeal");
        })
        .patch("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "patchMeal");
        })
        .put("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "updateMeal");
        })
        .delete("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "removeMeal");
        });

    return router;
}