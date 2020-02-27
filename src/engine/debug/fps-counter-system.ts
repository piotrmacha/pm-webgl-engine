import {TickSystem} from '../system';
import {Scene} from '../scene';
import {DebugContext} from './debug-context';

export class FpsCounterSystem extends TickSystem {
    private fps = 0;
    private secondsElapsed = 0;

    onTick(scene: Scene, deltaTime: number) {
        this.secondsElapsed += deltaTime;
        this.fps++;

        if (this.secondsElapsed >= 1) {
            DebugContext.set('fps', this.fps);
            this.secondsElapsed = 0;
            this.fps = 0;
        }
    }
}
