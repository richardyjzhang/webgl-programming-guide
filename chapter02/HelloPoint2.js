// HelloPoint2.js
// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`

// 片元着色器
const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`

function main() {
    // 获取<canvas>元素
    const canvas = document.getElementById('webgl');

    // 获取WebGL上下文
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    // 获取attribute变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    if (a_Position < 0 || a_PointSize < 0) {
        console.log('Failed to get the storage location');
        return;
    }


    // 将顶点位置传输给attribute变量
    gl.vertexAttrib3f(a_Position, 0.0, 0.5, 0.0);

    // 将顶点大小传给attribute变量
    gl.vertexAttrib1f(a_PointSize, 5.0);

    // 设置<canvas>背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制一个点
    gl.drawArrays(gl.POINT, 0, 1);
}