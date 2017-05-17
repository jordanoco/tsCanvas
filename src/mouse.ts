/* base mouse class */
class JTechMouse {
    canvas: HTMLCanvasElement;
    mousePosition: object;
    mouseState: Array<boolean>;

    /* these functions are overridable by the end user */
    onClick = (x: number, y: number, button: number) => {};
    onScroll = (vel: number) => {};

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