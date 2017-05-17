/* base graphics class */
class JTechGraphics {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    graphics_width: number;
    graphics_height: number;

    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.graphics_width = canvas.width;
        this.graphics_height = canvas.height;
    }

    /* returns the width and height of the canvas */
    getDimensions = (): object => {
        return {width: this.graphics_width, height: this.graphics_height};
    }

    /* clears the canvas */
    clear = (): void => {
        this.context.clearRect(0, 0, this.graphics_width, this.graphics_height);
    }

    /* sets the color to be used while drawing shapes to the canvas */
    setColor = (col: string): void => {
        this.context.fillStyle = col;
        this.context.strokeStyle = col;
    }

    /* sets the font to use in draw calls */
    setFont = (font: string, size: number): void => {
        this.context.font = size + 'px' + font;
    }

    /* draws text to the screen */
    print = (text: string, x: number, y: number, align: string): void => {
        this.context.textAlign = align;
        this.context.fillText(text, x, y);
    }

    /* draws a line */
    line = (x1: number, y1: number, x2: number, y2: number): void => {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    /* draws a rectangle with the specified position, width and height to the screen */
    rect = (x: number, y: number, width: number, height: number, style: string): void => {
        this.context.rect(x, y, width, height);
        if (style == "fill") 
            this.context.fill();
        else if (style == "line") 
            this.context.stroke();
    }

    /* draws a circle with the center at the specified position with the given radius */
    circle = (x: number, y: number, r: number, style: string): void => { 
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2*Math.PI);
        if (style == "fill") 
            this.context.fill();
        else if (style == "line") 
            this.context.stroke();       
    }

    /* draws a poly from the provided points */
    poly = (points: Array<number>, style: string): void => {
        this.context.beginPath();
        this.context.moveTo(points[0], points[1]);
        for (let i=2, len = points.length; i < len; i+=2) {
            this.context.lineTo(points[i], points[i+1]);
        }
        this.context.closePath();
        if (style == 'fill') 
            this.context.fill();
        else if (style == 'line')
            this.context.stroke();
    }
}