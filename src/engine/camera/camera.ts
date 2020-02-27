import {mat4} from 'gl-matrix';

export interface Camera {
    getProjection(): mat4;
}
