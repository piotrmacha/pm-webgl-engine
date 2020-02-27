import {Component} from '../component';
import {mat4, quat, vec3} from 'gl-matrix';

export class Transform implements Component {
    public translation: vec3;
    public rotation: quat;
    public scale: vec3;

    constructor() {
    }

    public modelView(): mat4 {
        const matrix = mat4.create();
        mat4.fromRotationTranslationScale(matrix, this.rotation, this.translation, this.scale);
        return matrix;
    }

    public static create(translation: vec3 = vec3.create(),
                         rotation: quat = quat.create(),
                         scale: vec3 = vec3.fromValues(1, 1, 1)): Transform {
        const transform = new Transform();
        transform.translation = translation;
        transform.rotation = rotation;
        transform.scale = scale;
        return transform;
    }
}
