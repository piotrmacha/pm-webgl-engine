import {Entity} from './entity';
import {Component} from './component';
import {EntityQueryCache} from './cache/entity-query-cache';
import {mat4, vec3} from 'gl-matrix';
import {Context} from './context';
import {Transform} from './components/transform';
import {Camera} from './camera/camera';
import {OrthographicCamera} from './camera/orthographic-camera';

export abstract class Scene {
    public camera: Camera;

    private entities: Entity[] = [];
    private nextEntityId = 0;

    private requiredComponentsQueryCache = new EntityQueryCache();
    private anyComponentQueryCache = new EntityQueryCache();

    public onInit(data: object = {}) {
        const canvas = Context.canvas;
        this.camera = new OrthographicCamera(canvas.width, canvas.width * (canvas.height / canvas.width));
        window.addEventListener('resize', () => {
            (this.camera as OrthographicCamera).resize(canvas.width, canvas.width * (canvas.height / canvas.width));
        })
    }

    public onDestroy() {
        this.entities = [];
        this.nextEntityId = 0;
        this.clearQueryCache();
    }

    public createEntity(components: Component[] = []): Entity {
        const entity = new Entity(this.nextEntityId++, () => {
            this.clearQueryCache();
        });
        components.forEach(component => entity.add(component));
        this.entities.push(entity);
        this.clearQueryCache();
        return entity;
    }

    public getEntities(): Entity[] {
        return this.entities;
    }

    public getEntitiesWithAll(...requiredComponents: { new (): Component }[]): Entity[] {
        return this.requiredComponentsQueryCache.getCached(requiredComponents, () => {
            return this.entities.filter(entity => entity.hasAll(...requiredComponents));
        });
    }

    public getEntitiesWithAny(...anyComponents: { new (): Component }[]): Entity[] {
        return this.anyComponentQueryCache.getCached(anyComponents, () => {
            return this.entities.filter(entity => entity.hasAny(...anyComponents));
        });
    }

    public removeEntity(entityId: number) {
        this.entities = this.entities.filter(e => e.entityId != entityId);
        this.clearQueryCache();
    }

    private clearQueryCache() {
        this.requiredComponentsQueryCache.clear();
        this.anyComponentQueryCache.clear();
    }
}
