import { Mediator, Component, NotifyResponse } from "../mediator.ts";
import * as useCase from "../use-cases.ts";

export class HealthComponent extends Component {
    constructor(mediator: Mediator, name: string = "health") {
        super(name, mediator);
    }

    public send(_sender: unknown): NotifyResponse {
        return useCase.health();
    }
}