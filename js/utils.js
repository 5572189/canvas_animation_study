// raf 兼容
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.cancelRequestAnimationFrame ||
        window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
        window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
        window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
        window.clearTimeout
    );
}

// 旋转角度函数 mx = mouse.x | my = mouse.y | ox = object.x | oy = object.y
function RotationToMouse(mx, my, ox, oy) {
    var dx = mx - ox;
    var dy = my - oy;
    var angle = Math.atan2(dy, dx);
    return angle;
}

var utils = {};

// 捕获鼠标坐标
window.utils.captureMouse = function(ele) {
    var mouse = {
        x: 0,
        y: 0
    };

    ele.addEventListener('mousemove', function(event) {
        event = event || window.event;

        var x, y;
        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        x -= ele.offsetLeft;
        y -= ele.offsetTop;

        mouse.x = x;
        mouse.y = y;
    }, false);

    return mouse;
};

// 获取触摸事件坐标
window.utils.captureTouch = function(ele) {
    var touch = {
            x: null,
            y: null,
            isPressed: false,
            event: null
        },
        body_scrollLeft = document.body.scrollLeft,
        ele_scrollLeft = document.documentElement.scrollLeft,
        body_scrollTop = document.body.scrollTop,
        ele_scrollTop = document.documentElement.scrollTop,
        offsetLeft = ele.offsetLeft,
        offsetTop = ele.offsetTop;

    ele.addEventListener('touchstart', function(event) {
        event = event || window.event;
        touch.isPressed = true;
        touch.event = event;
    }, false);

    ele.addEventListener('touchend', function(event) {
        event = event || window.event;
        touch.isPressed = false;
        touch.x = null;
        touch.y = null;
        touch.event = event;
    }, false);

    ele.addEventListener('touchmove', function(event) {
        event = event || window.event;

        var x, y,
            touch_event = event.touches[0];

        if (touch_event.pageX || touch_event.pageY) {
            x = touch_event.pageX;
            y = touch_event.pageY;
        } else {
            x = touch_event.clientX + body_scrollLeft + ele_scrollLeft;
            y = touch_event.clientY + body_scrollTop + ele_scrollTop;
        }
        x -= offsetLeft;
        y -= offsetTop;

        touch.x = x;
        touch.y = y;
        touch.event = event;
    }, false);

    return touch;
};

window.utils.parseColor = function(color, toNumber) {
    if (toNumber === true) {
        if (typeof color === 'number') {
            return (color | 0);
        }
        if (typeof color === 'string' && color[0] === '#') {
            color = color.slice(1);
        }
        return window.parseInt(color, 16);
    } else {
        if (typeof color === 'number') {
            color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
        }
        return color;
    }
};

// 将16进制颜色转换成rgb
window.utils.colorToRGB = function(color, alpha) {
    // 如果是字符串格式，转换为数字
    if (typeof color === "string" && color[0] === "#") {
        color = window.parseInt(color.slice(1), 16);
    }
    alpha = (alpha === undefined) ? 1 : alpha;

    // 将color转换成r,g,b值，>>右移  <<左移
    var r = color >> 16 & 0xff; // 例如：16777215 >> 16 变成 255， 255 & 0xff为255
    var g = color >> 8 & 0xff;
    var b = color & 0xff;
    a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);

    if (a === 1) {
        return "rgb(" + r + "," + g + "," + b + ")";
    } else {
        return "rgb(" + r + "," + g + "," + b + "," + a + ")";
    }
};

window.utils.containsPoint = function(rect, x, y) {
    return !(x < rect.x || x > rect.x + rect.width ||
        y < rect.y || y > rect.y + rect.height);
}

window.utils.intersects = function(rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
        rectB.x + rectB.width < rectA.x ||
        rectA.y + rectA.height < rectB.y ||
        rectB.y + rectB.height < rectA.y);
}