import { ConcreteMediator } from "./mediator.ts";
// Services for registration
import { HealthComponent } from "./services/health.class.ts";
import { CreateMealComponent } from "./services/create-meal.class.ts";
import { FindMealsComponent } from "./services/find-meals.class.ts";
import { GetMealComponent } from "./services/get-meal.class.ts";
import { UpdateMealComponent } from "./services/update-meal.class.ts";
import { RemoveMealComponent } from "./services/remove-meal.class.ts";

export const mediator = new ConcreteMediator();

mediator.register(new HealthComponent(mediator));
mediator.register(new CreateMealComponent(mediator));
mediator.register(new FindMealsComponent(mediator));
mediator.register(new GetMealComponent(mediator));
mediator.register(new UpdateMealComponent(mediator));
mediator.register(new RemoveMealComponent(mediator));