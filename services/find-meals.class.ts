import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class FindMealsComponent extends Component {
    constructor(mediator: Mediator, name: string = "findMeals") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.findMeals(sender);
    }
}