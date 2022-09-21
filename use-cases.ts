import { RouteParams } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
import {
    MealId,
    Meal,
    SingleMeal,
} from './store.ts';

export function health() {
    return { success: true, message: "Hello from Food Weekly!" };
}

export async function createMeal(context: any) {
    const body = context.request.body();
    const mealData: Meal = await body.value;
    const meal: SingleMeal = await context.app.state.mealStore.create(mealData);
    return {
        success: true,
        data: meal,
    };
}

export async function findMeals(context: any) {
    return {
        success: true,
        data: await context.app.state.mealStore.find({}),
    };
}

export async function getMeal(context: any) {
    const mealId: MealId = new ObjectId(context?.params?.id);
    const meal: SingleMeal = await context.app.state.mealStore.get(mealId);
    return {
        success: true,
        data: meal,
    };
}

export async function patchMeal(context: any) {
    const body = context.request.body();
    const mealId: MealId = new ObjectId(context?.params?.id);
    const mealData: Meal = await body.value;
    const meal: SingleMeal = await context.app.state.mealStore.patch(mealId, { $set: mealData });
    return {
        success: true,
        data: meal,
    };
}

export async function updateMeal(context: any) {
    const body = context.request.body();
    const mealId: MealId = new ObjectId(context?.params?.id);
    const mealData: Meal = await body.value;
    const meal: SingleMeal = await context.app.state.mealStore.update(mealId, mealData);
    return {
        success: true,
        data: meal,
    };
}

export async function deleteMeal(context: any) {
    const mealId: MealId = new ObjectId(context?.params?.id);
    const meal: SingleMeal = await context.app.state.mealStore.remove(mealId);
    return {
        success: meal ? true : false,
        data: meal,
    };
}