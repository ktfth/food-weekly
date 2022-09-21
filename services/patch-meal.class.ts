import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class PatchMealComponent extends Component {
    constructor(mediator: Mediator, name: string = "patchMeal") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.patchMeal(sender);
    }
}