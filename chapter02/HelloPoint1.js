// HelloPoint1.js
// 顶点着色器程序
const VSHADER_SOURCE = `
    void main() {
        gl_Position = vec4(0.7, 0.3, 0.0, 1.0);
        gl_PointSize = 10.0;
    }
`

const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
`

function main() {
    // 获取<canvas>元素
    const canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    // 设置<canvas>的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清空<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);
}