import {ActorScript} from '../engine/actor/actor-script';
import {Scene} from '../engine/scene';
import {Entity} from '../engine/entity';
import {DebugContext} from '../engine/debug/debug-context';
import {mat4, quat, vec3} from 'gl-matrix';
import {OrthographicCamera} from '../engine/camera/orthographic-camera';

export class ExampleActor extends ActorScript {
    onInit(scene: Scene, entity: Entity) {
        super.onInit(scene, entity);

        (scene.camera as OrthographicCamera).transform.translation = vec3.fromValues(10, -50, 0);
        // (scene.camera as OrthographicCamera).transform.scale = vec3.fromValues(2, 2, 1);
        // quat.fromEuler((scene.camera as OrthographicCamera).transform.rotation, 0, 0, -45);
        (scene.camera as OrthographicCamera).update();
    }

    onUpdate(scene: Scene, deltaTime: number) {
    }
}
