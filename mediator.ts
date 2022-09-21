import { ResponseBody, ResponseBodyFunction } from "https://deno.land/x/oak@v11.1.0/response.ts";

export type NotifyResponse = ResponseBody | ResponseBodyFunction;

export interface Mediator {
    notify(sender: unknown, event: string): Promise<NotifyResponse>;
}

export class ConcreteMediator implements Mediator {
    private components: { [key: string]: Component };

    constructor() {
        this.components = {};
    }

    public register(component: Component): void {
        this.components[`${component.name}`] = component;
        this.components[`${component.name}`].setMediator(this);
    }

    public async notify(sender: unknown, event: string): Promise<NotifyResponse> {
        return await this.components[`${event}`].send(sender);
    }
}

export class Component {
    private mediator: Mediator;
    public name: string;

    constructor(name: string, mediator: Mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public setMediator(mediator: Mediator): void {
        this.mediator = mediator;
    }

    public send(sender: unknown): NotifyResponse {
        return this.mediator.notify(sender, this.name);
    }
}