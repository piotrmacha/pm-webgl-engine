import {Component} from '../component';
import {ActorScript} from '../actor/actor-script';

export class Actor implements Component {
    public script: ActorScript;
    public isInitialized = false;

    constructor() {
    }

    public static create(script: ActorScript) {
        const actor = new Actor();
        actor.script = script;
        return actor;
    }
}
