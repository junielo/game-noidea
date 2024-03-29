import { ElementRef } from "@angular/core";
import { GameFactory } from "./game.factory";
import { Camera } from "../game_object/camera";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";
import { Time } from "./time-util";

export abstract class GameEngine {

    private drawShape!: CanvasRenderingContext2D;
    private canvas!: ElementRef<HTMLCanvasElement>

    protected gameFactory: GameFactory = new GameFactory();
    private camera: Camera = this.gameFactory.camera;
    private animateCallbacks: IAnimateCallback[] = [];
    private keydownCallbacks: IKeydownCallback[] = [];
    private keyupCallbacks: IKeyupCallback[] = [];

    protected abstract setupScene(): void;

    protected setCanvasRef(canvas: ElementRef<HTMLCanvasElement>): void {
        this.canvas = canvas;
        this.drawShape = canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        this.setupScene();
        this.setupGameCallbacks();
        this.scaleCanvas();
        this.draw();
    }

    /**
     * scaleCanvas function is to ensure that the canvas is scaled properly
     * every time the window is resized.
     */
    protected scaleCanvas(): void {
        const canvas = this.canvas.nativeElement;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;

        // Scale the drawing context
        this.drawShape.scale(dpr, dpr);

        const windowWidth = canvas.clientWidth;
        const windowHeight = canvas.clientHeight;

        this.camera.resetBounds();
        if(windowWidth > windowHeight) {
            const ratio = windowWidth / windowHeight;
            const newWidth = ((this.camera.defaultWidth * ratio));
            this.camera.setWidth(newWidth);
        }
        else if (windowWidth < windowHeight) {
            const ratio = windowHeight / windowWidth;
            const newHeight = ((this.camera.defaultHeight * ratio));
            this.camera.setHeight(newHeight);
        }
    }

    protected onKeydown(event: KeyboardEvent): void {
        this.keydownCallbacks.forEach(control => control.keydown(event));
    }

    protected onKeyup(event: KeyboardEvent): void {
        this.keyupCallbacks.forEach(control => control.keyup(event));
    }

    private draw(): void {
        Time.setCurrentTime();
        this.drawShape.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // Draw the background
        this.drawShape.fillStyle = 'lightblue'; // Set background color
        this.drawShape.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        this.animateCallbacks.forEach(control => control.animate());
        this.gameFactory.gameObjects.forEach(obj => obj.draw(this.drawShape));
        Time.setPreviousTime();
        requestAnimationFrame(() => this.draw());
    }

    private setupGameCallbacks(): void {
        this.animateCallbacks = this.gameFactory.customControls.filter((control): control is IAnimateCallback => "animate" in control);
        this.keydownCallbacks = this.gameFactory.customControls.filter((control): control is IKeydownCallback => "keydown" in control);
        this.keyupCallbacks = this.gameFactory.customControls.filter((control): control is IKeyupCallback => "keyup" in control);
    }

}