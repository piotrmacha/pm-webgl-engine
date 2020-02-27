import {Scene} from './scene';

export interface System {

}

export abstract class TickSystem implements System {
    abstract onTick(scene: Scene, deltaTime: number);
}

export abstract class IntervalSystem implements System {
    abstract onInterval(scene: Scene);
}
