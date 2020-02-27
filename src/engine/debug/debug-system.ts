import {IntervalSystem} from '../system';
import {Scene} from '../scene';
import {DebugContext} from './debug-context';

export class DebugSystem extends IntervalSystem {
    onInterval(scene: Scene) {
        DebugContext.log();
    }
}
