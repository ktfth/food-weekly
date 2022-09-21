import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class UpdateMealComponent extends Component {
    constructor(mediator: Mediator, name: string = "updateMeal") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.updateMeal(sender);
    }
}