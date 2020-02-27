import {Transform} from '../components/transform';
import {mat4, vec3} from 'gl-matrix';
import {Camera} from './camera';

export class OrthographicCamera implements Camera {
    public transform = Transform.create();
    private matrix: mat4 = mat4.create();

    constructor(private width: number, private height: number) {
        this.update();
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.update();
    }

    public getProjection() {
        return this.matrix;
    }

    public update() {
        const transX = this.transform.translation[0];
        const transY = this.transform.translation[1];
        const transZ = this.transform.translation[2];
        const scaleX = this.transform.scale[0];
        const scaleY = this.transform.scale[1]
        const scaleZ = this.transform.scale[2];
        mat4.ortho(this.matrix,
            transX * scaleX, (this.width + transX) * scaleX,
            (this.height + transY) * scaleY, transY * scaleY,
            transZ * scaleZ, (1000 + transZ) * scaleZ);
        mat4.rotateX(this.matrix, this.matrix, this.transform.rotation[0])
        mat4.rotateY(this.matrix, this.matrix, this.transform.rotation[1])
        mat4.rotateZ(this.matrix, this.matrix, this.transform.rotation[2])
    }
}
