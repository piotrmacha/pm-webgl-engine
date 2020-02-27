import {Component} from './component';

export class Entity {
    private components = new Map<{ new(): Component }, Component>();

    constructor(public readonly entityId: number, private readonly onComponentChange: () => void) {
    }

    public add<T extends Component>(component: T) {
        this.components.set(component.constructor as { new(): Component }, component);
        this.onComponentChange();
    }

    public get<T extends Component>(component: { new(): T }): T {
        return this.components.get(component) as T;
    }

    public has<T extends Component>(component: { new(): T }) {
        this.components.has(component);
    }

    public hasAll(...components: { new(): Component }[]) {
        return components.every(component => this.components.has(component));
    }

    public hasAny(...components: { new(): Component }[]) {
        return components.some(component => this.components.has(component));
    }

    public remove<T extends Component>(component: { new(): T }) {
        this.components.delete(component);
        this.onComponentChange();
    }
}
