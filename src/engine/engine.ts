import {Scene} from './scene';
import {IntervalSystem, TickSystem} from './system';

export class Engine {
    private scenes: { [key: string]: Scene } = {};
    private activeScene: Scene;
    private tickSystems: TickSystem[] = [];

    public addScene(name: string, scene: Scene) {
        this.scenes[name] = scene;
        if (!this.activeScene) {
            this.activateScene(name);
        }
    }

    public addTickSystem(system: TickSystem) {
        this.tickSystems.push(system);
    }

    public addIntervalSystem(interval: number, system: IntervalSystem) {
        setInterval(() => {
            system.onInterval(this.activeScene);
        }, interval);
    }

    public activateScene(name: string, data: object = {}) {
        if (!this.scenes[name]) {
            throw new Error(`Scene [${name}] was not registered. Available scenes: [${Object.keys(this.scenes).join(', ')}]`);
        }

        if (this.activeScene) {
            this.activeScene.onDestroy();
        }

        this.activeScene = this.scenes[name];
        this.activeScene.onInit(data);
    }

    public start() {
        this.tick(performance.now());
    }

    private tick(lastNow: number) {
        const now = performance.now();
        const deltaTime = (now - lastNow) / 1000;

        this.tickSystems.forEach(system => system.onTick(this.activeScene, deltaTime));

        setTimeout(() => this.tick(now));
    }
}
