import {
    Collection,
    ObjectId,
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";

export type MealId = ObjectId;

export type Meal = {
    _id: MealId;
    name: string;
    rating: number;
    happiness: number;
}

export type SingleMeal = Meal | undefined;

export class MealStore {
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