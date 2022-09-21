import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class RemoveMealComponent extends Component {
    constructor(mediator: Mediator, name: string = "removeMeal") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.deleteMeal(sender);
    }
}