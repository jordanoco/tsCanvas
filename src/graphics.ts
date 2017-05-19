/**
 * Represents an image
 * @constructor
 * @param {string} url
 */
class TSCanvasImage {
    img: HTMLImageElement;

    constructor (url: string) {
        this.img = new Image();
        this.img.src = url;
    }
}

/**
 * Controls the graphics for a canvas
 * @constructor
 * @param {HTMLCanvasElement} canvas
 */
class TSCanvasGraphics {
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

    /**
     * Returns the width and height of the canvas
     * @returns {object} the dimensions of the canvas
     */
    getDimensions = (): object => {
        return {width: this.graphics_width, height: this.graphics_height};
    }

    /**
     * Clears the canvas
     */
    clear = (): void => {
        this.context.clearRect(0, 0, this.graphics_width, this.graphics_height);
    }

    /**
     * Sets the color to use when drawing to the canvas
     * @param {string} color the color used when drawing
     */
    setColor = (col: string): void => {
        this.context.fillStyle = col;
        this.context.strokeStyle = col;
    }

    /**
     * Sets the font to use when drawing text
     * @param {string} font the font to use
     * @param {number} size the size of the text
     */
    setFont = (font: string, size: number): void => {
        this.context.font = size + 'px' + font;
    }

    /**
     * Draws an image to the canvas
     * @param {TSCanvasImage} image the image to draw
     * @param {number} x the x position to render the image at
     * @param {number} y the y position to render the image at
     */
    draw = (image: TSCanvasImage, x: number, y: number): void => {
        this.context.drawImage(image.img, x, y);
    }

    /**
     * Draws text to the screen
     * @param {string} text the text to draw
     * @param {number} x the x position to draw the string at
     * @param {number} y the y position to draw the string at
     * @param {string} align the alignment of the text
     */
    print = (text: string, x: number, y: number, align: string): void => {
        this.context.textAlign = align;
        this.context.fillText(text, x, y);
    }

    /**
     * Draws a line between two points
     * @param {number} x1 the starting x position
     * @param {number} y1 the starting y position
     * @param {number} x2 the ending x position
     * @param {number} y2 the ending y position
     */ 
    line = (x1: number, y1: number, x2: number, y2: number): void => {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    /**
     * Draws a rectangle
     * @param {number} x the x position to draw the rectangle at
     * @param {number} y the y position to draw the rectangle at
     * @param {number} width the width of the rectangle
     * @param {number} height the height of the rectangle
     * @param {string} style the style to use when drawing, either fill or line
     */
    rect = (x: number, y: number, width: number, height: number, style: string): void => {
        this.context.rect(x, y, width, height);
        if (style == "fill") 
            this.context.fill();
        else if (style == "line") 
            this.context.stroke();
    }

    /**
     * Draws a circle
     * @param {number} x the x position of the centre of the circle
     * @param {number} y the y position of the centre of the circle
     * @param {number} r the radius of the circle
     * @param {string} style the style to use when drawing, either fill or line
     */
    circle = (x: number, y: number, r: number, style: string): void => { 
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2*Math.PI);
        if (style == "fill") 
            this.context.fill();
        else if (style == "line") 
            this.context.stroke();       
    }

    /**
     * Draws a polygon
     * @param {Array<number>} points the points to draw
     * @param {string} style the style to use when drawing, either fill or line
     */
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