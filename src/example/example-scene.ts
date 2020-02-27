import {Scene} from '../engine/scene';
import {Transform} from '../engine/components/transform';
import {Actor} from '../engine/components/actor';
import {ExampleActor} from './example-actor';
import {Model} from '../engine/components/model';
import {quat, vec3} from 'gl-matrix';

export class ExampleScene extends Scene {
    public onInit(data: object = {}) {
        super.onInit(data);

        const playerModel = new Model();
        playerModel.program = 'base';
        playerModel.vertices = [
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, -0.5, 0
        ];

        const player = this.createEntity([
            Transform.create(vec3.fromValues(100, 100, 0), quat.create(), vec3.fromValues(100, 100, 100)),
            Actor.create(new ExampleActor()),
            playerModel
        ]);
    }
}
