import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

const client = new MongoClient();

const db = await client.connect("mongodb://127.0.0.1:27017/food-weekly");

type MealId = ObjectId;

type Meal = {
    _id: MealId;
    name: string;
    rating: number;
    happiness: number;
}

// const meals = new Map<MealId, Meal>();
// meals.set(1, {
//   id: 1,
//   name: "Nhoque",
//   rating: 3,
//   happiness: 5
// });

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello from Food Weekly!";
  })
  .post("/meals", async (context) => {
    const body = context.request.body();
    const mealData = await body.value;
    const meals = db.collection<Meal>("meals");
    const meal = await meals.insertOne(mealData);
    context.response.body = {
      success: true,
      data: meal,
    };
  })
  .get("/meals", async (context) => {
    const meals = db.collection<Meal>("meals");
    context.response.body = {
      success: true,
      data: await meals.find({}).toArray(),
    };
  })
  .get("/meal/:id", async (context) => {
    const mealId: MealId = new ObjectId(context?.params?.id);
    const meals = db.collection<Meal>("meals");
    const meal = await meals.findOne({ _id: mealId });
    context.response.body = {
      success: true,
      data: meal,
    };
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });