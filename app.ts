import { Application, Router } from "https://deno.land/x/oak/mod.ts";

type MealId = number;

type Meal = {
    id: number;
    name: string;
    rating: number;
    happiness: number;
}

const meals = new Map<MealId, Meal>();
meals.set(1, {
  id: 1,
  name: "Nhoque",
  rating: 3,
  happiness: 5
});

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello from Food Weekly!";
  })
  .post("/meals", async (context) => {
    const body = context.request.body();
    const meal = await body.value;
    const lastMealId = meals.values().next().value.id + 1;
    meals.set(lastMealId, meal);
    meal.id = lastMealId;
    context.response.body = meal;
  })
  .get("/meals", (context) => {
    context.response.body = Array.from(meals.values());
  })
  .get("/meal/:id", (context) => {
    const mealId: MealId = parseInt(context?.params?.id, 10);
    if (meals.has(mealId)) {
      context.response.body = meals.get(mealId);
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });