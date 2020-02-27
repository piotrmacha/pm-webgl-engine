import {TickSystem} from '../system';
import {Scene} from '../scene';
import {Actor} from '../components/actor';

export class ActorSystem implements TickSystem {
    public onTick(scene: Scene, deltaTime: number) {
        scene.getEntitiesWithAll(Actor).forEach(entity => {
            const actor = entity.get(Actor);
            if (!actor.isInitialized) {
                actor.script.onInit(scene, entity);
                actor.isInitialized = true;
            }
            actor.script.onUpdate(scene, deltaTime);
        });
    }
}
