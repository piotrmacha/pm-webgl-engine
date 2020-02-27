import {Component} from '../component';

export class Model implements Component {
    public program: string;
    public vertices: number[];

    public buffers;

    constructor() {
    }

    public static create(program: string, vertices: number[]): Model {
        const model = new Model();
        model.program = program;
        model.vertices = vertices;
        return model;
    }
}
