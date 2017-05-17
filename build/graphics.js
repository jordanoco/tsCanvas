/* base graphics class */
var JTechGraphics = (function () {
    function JTechGraphics(canvas) {
        var _this = this;
        /* returns the width and height of the canvas */
        this.getDimensions = function () {
            return { width: _this.graphics_width, height: _this.graphics_height };
        };
        /* clears the canvas */
        this.clear = function () {
            _this.context.clearRect(0, 0, _this.graphics_width, _this.graphics_height);
        };
        /* sets the color to be used while drawing shapes to the canvas */
        this.setColor = function (col) {
            _this.context.fillStyle = col;
            _this.context.strokeStyle = col;
        };
        /* sets the font to use in draw calls */
        this.setFont = function (font, size) {
            _this.context.font = size + 'px' + font;
        };
        /* draws text to the screen */
        this.print = function (text, x, y, align) {
            _this.context.textAlign = align;
            _this.context.fillText(text, x, y);
        };
        /* draws a line */
        this.line = function (x1, y1, x2, y2) {
            _this.context.beginPath();
            _this.context.moveTo(x1, y1);
            _this.context.lineTo(x2, y2);
            _this.context.stroke();
        };
        /* draws a rectangle with the specified position, width and height to the screen */
        this.rect = function (x, y, width, height, style) {
            _this.context.rect(x, y, width, height);
            if (style == "fill")
                _this.context.fill();
            else if (style == "line")
                _this.context.stroke();
        };
        /* draws a circle with the center at the specified position with the given radius */
        this.circle = function (x, y, r, style) {
            _this.context.beginPath();
            _this.context.arc(x, y, r, 0, 2 * Math.PI);
            if (style == "fill")
                _this.context.fill();
            else if (style == "line")
                _this.context.stroke();
        };
        /* draws a poly from the provided points */
        this.poly = function (points, style) {
            _this.context.beginPath();
            _this.context.moveTo(points[0], points[1]);
            for (var i = 2, len = points.length; i < len; i += 2) {
                _this.context.lineTo(points[i], points[i + 1]);
            }
            _this.context.closePath();
            if (style == 'fill')
                _this.context.fill();
            else if (style == 'line')
                _this.context.stroke();
        };
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.graphics_width = canvas.width;
        this.graphics_height = canvas.height;
    }
    return JTechGraphics;
}());
