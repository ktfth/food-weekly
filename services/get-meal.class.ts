import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class GetMealComponent extends Component {
    constructor(mediator: Mediator, name: string = "getMeal") {
        super(name, mediator);
    }

    public send(sender: unknown): NotifyResponse {
        return useCase.getMeal(sender);
    }
}