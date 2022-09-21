import {
    Collection,
    Database,
    InsertDocument,
    ObjectId,
    UpdateFilter,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

type Query = any;

type Single<T> = T | undefined;

class Store<T> {
    private db: Database;
    public collection: Collection<T>;

    constructor(db: Database, collectionName: string) {
        this.db = db;
        this.collection = this.db.collection(collectionName);
    }

    async find(query: Query): Promise<Array<T>> {
        return await this.collection.find(query).toArray();
    }

    async get(id: ObjectId): Promise<Single<T>> {
        return await this.collection.findOne({ _id: id });
    }

    async create(data: T): Promise<Single<T>> {
        const result = await this.collection.insertOne(data);
        return await this.collection.findOne({ _id: result });
    }

    async patch(id: ObjectId, patch: UpdateFilter<T>): Promise<Single<T>> {
        await this.collection.updateOne({ _id: id }, patch);
        return await this.collection.findOne({ _id: id });
    }

    async update(id: ObjectId, update: InsertDocument<T>): Promise<Single<T>> {
        await this.collection.replaceOne({ _id: id }, update);
        return await this.collection.findOne({ _id: id });
    }

    async remove(id: ObjectId): Promise<Single<T>> {
        const result = await this.collection.findOne({ _id: id });
        await this.collection.deleteOne({ _id: id });
        return result;
    }    
}

export type MealId = ObjectId;

export type Meal = {
    _id: MealId;
    name: string;
    rating: number;
    happiness: number;
}

export type MealQuery = {
    _id?: MealId;
    name?: string;
    rating?: number;
    happiness?: number;
};

export type SingleMeal = Meal | undefined;

export class MealStore<Meal> extends Store<Meal> {
    constructor(db: Database, collectionName: string = "meals") {
        super(db, collectionName);
    }
}

export function createMealStore(db: Database): MealStore<Meal> {
    return new MealStore(db);
}