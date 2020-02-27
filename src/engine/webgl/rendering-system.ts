import {TickSystem} from '../system';
import {Scene} from '../scene';
import {Transform} from '../components/transform';
import {Model} from '../components/model';
import {DebugContext} from '../debug/debug-context';

interface Program {
    program: WebGLProgram,
    attributes: {
        vertex: number
    },
    uniforms: {
        projection: WebGLUniformLocation,
        modelView: WebGLUniformLocation
    }
}

export class RenderingSystem implements TickSystem {
    private readonly gl: WebGLRenderingContext;
    private readonly programs: { [key: string]: Program } = {};

    constructor(private readonly canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext('webgl');
        if (!this.gl) {
            throw new Error('Could not initialize WebGL context');
        }
        this.calculateCanvasSize();
        window.addEventListener('resize', () => this.calculateCanvasSize());
    }

    public createProgram(name: string, vertexSource: string, fragmentSource: string) {
        const createShader = (type: number, source: string) => {
            const shader = this.gl.createShader(type);
            this.gl.shaderSource(shader, source);
            this.gl.compileShader(shader);
            if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
                this.gl.deleteShader(shader);
                throw new Error(`Could not compile shader: ${this.gl.getShaderInfoLog(shader)}`);
            }
            return shader;
        }

        const vertexShader = createShader(this.gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            throw new Error(`Could not compile shader: ${this.gl.getProgramInfoLog(program)}`);
        }

        this.programs[name] = {
            program,
            attributes: {
                vertex: this.gl.getAttribLocation(program, 'inVertex')
            },
            uniforms: {
                projection: this.gl.getUniformLocation(program, 'inProjection'),
                modelView: this.gl.getUniformLocation(program, 'inModelView')
            }
        };
    }

    public onTick(scene: Scene, deltaTime: number) {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        scene.getEntitiesWithAll(Transform, Model).forEach(entity => {
            DebugContext.set('rendering', entity);

            const transform = entity.get(Transform);
            const model = entity.get(Model);

            if (!model.buffers) {
                this.initializeBuffers(model);
            }

            const program = this.programs[model.program];

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.buffers.vertex);
            this.gl.vertexAttribPointer(program.attributes.vertex, 3, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(program.attributes.vertex);

            this.gl.useProgram(program.program);
            this.gl.uniformMatrix4fv(program.uniforms.projection, false, scene.camera.getProjection());
            this.gl.uniformMatrix4fv(program.uniforms.modelView, false, transform.modelView());

            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, model.vertices.length / 3);
        });
    }

    private initializeBuffers(model: Model) {
        model.buffers = {
            vertex: this.gl.createBuffer()
        };

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, model.buffers.vertex);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(model.vertices), this.gl.STATIC_DRAW);
    }

    private calculateCanvasSize() {
        this.gl.canvas.width = this.canvas.offsetWidth;
        this.gl.canvas.height = this.canvas.offsetHeight;
    }
}
