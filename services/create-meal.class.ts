import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class CreateMealComponent extends Component {
    constructor(mediator: Mediator, name: string = "createMeal") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.createMeal(sender);
    }
}