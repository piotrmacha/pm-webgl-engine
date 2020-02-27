import { Engine } from './engine/engine';
import {ExampleScene} from './example/example-scene';
import {ActorSystem} from './engine/actor/actor-system';
import {DebugSystem} from './engine/debug/debug-system';
import {FpsCounterSystem} from './engine/debug/fps-counter-system';
import {RenderingSystem} from './engine/webgl/rendering-system';
import {AssetManager} from './engine/assets/asset-manager';
import {Context} from './engine/context';

Context.canvas = document.getElementById('canvas') as HTMLCanvasElement;

Promise.all([
    AssetManager.loadString('shader/base.vert'),
    AssetManager.loadString('shader/base.frag'),
]).then(() => {
    const rendering = new RenderingSystem(Context.canvas);

    rendering.createProgram('base', AssetManager.get('shader/base.vert'), AssetManager.get('shader/base.frag'));

    const engine = new Engine();

    engine.addTickSystem(rendering);
    engine.addTickSystem(new ActorSystem());
    engine.addTickSystem(new FpsCounterSystem());

    engine.addIntervalSystem(5000, new DebugSystem());

    engine.addScene('example', new ExampleScene());

    engine.activateScene('example');

    engine.start();
});
