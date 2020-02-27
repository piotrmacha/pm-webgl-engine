import {Entity} from '../entity';
import {Scene} from '../scene';

export abstract class ActorScript {
    protected scene: Scene;
    protected entity: Entity;

    public onInit(scene: Scene, entity: Entity) {
        this.scene = scene;
        this.entity = entity;
    }

    public onUpdate(scene: Scene, deltaTime: number) {

    }
}
