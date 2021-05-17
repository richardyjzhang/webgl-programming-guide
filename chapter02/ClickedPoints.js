// ClickedPoint.js
// 顶点着色器
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    void main() {
        gl_Position = a_Position;
        gl_PointSize = 10.0;
    }
`;

// 片元着色器
const FSHADER_SOURCE = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

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

    // 获取a_Position变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 注册鼠标点击事件响应函数
    canvas.onmousedown = function (ev) { click(ev, gl, canvas, a_Position); };

    // 设置<canvas>背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // 清除<canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
}

const g_points = [];
function click(ev, gl, canvas, a_Position) {
    let x = ev.clientX; // 鼠标点击处的屏幕X坐标
    let y = ev.clientY; // 鼠标点击处的屏幕Y坐标
    const rect = ev.target.getBoundingClientRect();

    // 屏幕坐标系 -> canvas坐标系 -> WebGL坐标系
    x = ((x - rect.left) - 0.5 * canvas.width) / (0.5 * canvas.width);
    y = (0.5 * canvas.height - (y - rect.top)) / (0.5 * canvas.height);

    g_points.push([x, y]);

    gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < g_points.length; i++) {
        const xy = g_points[i];
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
        gl.drawArrays(gl.POINT, 0, 1);
    }
}