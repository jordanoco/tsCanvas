/* base mouse class */
var JTechMouse = (function () {
    function JTechMouse(canvas) {
        var _this = this;
        /* these functions are overridable by the end user */
        this.onClick = function (x, y, button) { };
        this.onScroll = function (vel) { };
        this.canvas = canvas;
        this.mousePosition = { x: 0, y: 0 };
        this.mouseState = [false, false, false];
        /* we need to attach some event listeners to listen for clicks */
        /* this tracks mouse position */
        this.canvas.addEventListener('mousemove', function (e) {
            _this.mousePosition = {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetHeight
            };
            return false;
        });
        /* this one tracks mouse clicks */
        this.canvas.addEventListener('mousedown', function (e) {
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;
            var button = 1;
            if (e.which == 3)
                button = 2;
            else if (e.which == 2)
                button = 3;
            _this.mouseState[button] = true;
            _this.onClick(x, y, button);
            return false;
        });
        /* this tracks when mouse buttons are lifted */
        this.canvas.addEventListener('mouseup', function (e) {
            var button = 1;
            if (e.which == 3)
                button = 2;
            else if (e.which == 2)
                button = 3;
            _this.mouseState[button] = false;
        });
        /* this makes sure that if the mouse leaves the canvas, info is reset */
        this.canvas.addEventListener('mouseleave', function () {
            _this.mouseState = [false, false, false];
        });
        /* this stops the right click menu triggering */
        this.canvas.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            return false;
        });
        /* this is triggered when the mouse is scrolled inside the canvas */
        this.canvas.addEventListener('wheel', function (e) {
            var vel = -Math.max(-1, Math.min(1, -e.detail));
            _this.onScroll(vel);
            return false;
        });
    }
    return JTechMouse;
}());
