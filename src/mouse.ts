/**
* Handles mouse input
* @constructor
* @param {HTMLCanvasElement} canvas the canvas this watches in
*/
export class TSCanvasMouse {
    private canvas: HTMLCanvasElement;
    private mousePosition: object;
    private mouseState: Array<boolean>;

    /**
     * Called when the user clicks
     * @param {number} x the x position of the click
     * @param {number} y the y position of the click
     * @param {button} number the button pressed, 1 for left, 2 for right, 3 for middle
     */
    onClick = (x: number, y: number, button: number) => {};

    /**
     * Called when the user scrolls in the canvas
     * @param {number} vel the velocity of the scrolling
     */
    onScroll = (vel: number) => {};

    /**
     * Gets the postion of the mouse
     * @return {object} the position of the mouse
     */
    getPosition = (): object => {
        return this.mousePosition;
    }

    /**
     * Returns the state of one of the buttons
     * @param {number} button the button to check, 1 for left, 2 for right, 3 for middle
     * @return {boolean} the state of the button, true for pressed, false otherwise
     */
     isPressed = (button: number): boolean => {
        return this.mouseState[button];
     }

    constructor (canvas: HTMLCanvasElement){
        this.canvas = canvas;
        this.mousePosition = {x: 0, y: 0};
        this.mouseState = [false, false, false];

        /* we need to attach some event listeners to listen for clicks */

        /* this tracks mouse position */
        this.canvas.addEventListener('mousemove', (e: MouseEvent): boolean => {
            this.mousePosition = {
                x: e.pageX - canvas.offsetLeft,
                y: e.pageY - canvas.offsetHeight
            }
            return false;
        });

        /* this one tracks mouse clicks */
        this.canvas.addEventListener('mousedown', (e: MouseEvent): boolean => {
            let x = e.pageX - canvas.offsetLeft;
            let y = e.pageY - canvas.offsetTop;
            let button = 1;
            if (e.which == 3) 
                button = 2;
            else if (e.which == 2) 
                button = 3;
            this.mouseState[button] = true;
            this.onClick(x, y, button);
            return false;
        });

        /* this tracks when mouse buttons are lifted */
        this.canvas.addEventListener('mouseup', (e: MouseEvent): void => {
            let button = 1;
            if (e.which == 3)
                button = 2
            else if (e.which == 2)
                button = 3
            this.mouseState[button] = false;
        });

        /* this makes sure that if the mouse leaves the canvas, info is reset */
        this.canvas.addEventListener('mouseleave', (): void => {
            this.mouseState = [false, false, false];
        });

        /* this stops the right click menu triggering */
        this.canvas.addEventListener('contextmenu', (e: MouseEvent): boolean => {
            e.preventDefault();
            return false;
        });

        /* this is triggered when the mouse is scrolled inside the canvas */
        this.canvas.addEventListener('wheel', (e: MouseEvent): boolean => {
            let vel = -Math.max(-1, Math.min(1, -e.detail));
            this.onScroll(vel);
            return false;
        });
    }   
}