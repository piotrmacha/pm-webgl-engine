attribute vec4 inVertex;

uniform mat4 inModelView;
uniform mat4 inProjection;

void main() {
    gl_Position = inProjection * inModelView * inVertex;
}
