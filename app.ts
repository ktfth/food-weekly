import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
Collection,
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

type SingleMeal = Meal | undefined;

class MealStore {
  private collection: Collection<Meal>;

  constructor(collection: Collection<Meal>) {
    this.collection = collection;
  }

  async find(query: QueuingStrategy): Promise<Array<Meal>> {
    return await this.collection.find(query).toArray();
  }

  async get(id: MealId): Promise<SingleMeal> {
    return await this.collection.findOne({ _id: id });
  }

  async create(data: Meal): Promise<SingleMeal> {
    const meal = await this.collection.insertOne(data);
    return await this.collection.findOne({ _id: meal });
  }

  async update(id: MealId, data: Meal): Promise<SingleMeal> {
    await this.collection.updateOne({ _id: id }, { $set: data });
    return await this.collection.findOne({ _id: id });
  }

  async remove(id: MealId): Promise<SingleMeal> {
    const meal = await this.collection.findOne({ _id: id });
    await this.collection.deleteOne({ _id: id });
    return meal;
  }
}

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

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });