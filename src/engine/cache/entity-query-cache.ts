import {Component} from '../component';
import {Entity} from '../entity';

export class EntityQueryCache {
    private cache = new Map<{ new(): Component }[], Entity[]>();

    public getCached(components: { new(): Component }[], fetch: { (): Entity[] }) {
        if (!this.cache.has(components)) {
            this.cache.set(components, fetch());
        }
        return this.cache.get(components);
    }

    public clear() {
        this.cache.clear();
    }
}
