import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { Database } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { MealStore, Meal, createMealStore } from "./store.ts";
import { ConcreteMediator } from "./mediator.ts";
// Services for registration
import { HealthComponent } from "./services/health.class.ts";
import { CreateMealComponent } from "./services/create-meal.class.ts";
import { FindMealsComponent } from "./services/find-meals.class.ts";
import { GetMealComponent } from "./services/get-meal.class.ts";
import { UpdateMealComponent } from "./services/update-meal.class.ts";
import { RemoveMealComponent } from "./services/remove-meal.class.ts";

const mediator = new ConcreteMediator();

mediator.register(new HealthComponent(mediator));
mediator.register(new CreateMealComponent(mediator));
mediator.register(new FindMealsComponent(mediator));
mediator.register(new GetMealComponent(mediator));
mediator.register(new UpdateMealComponent(mediator));
mediator.register(new RemoveMealComponent(mediator));

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
            context.response.body = await mediator.notify({...context}, "updateMeal");
        })
        .put("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "updateMeal");
        })
        .delete("/meal/:id", async (context) => {
            context.response.body = await mediator.notify({...context}, "removeMeal");
        });

    return router;
}