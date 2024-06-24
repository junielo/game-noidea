import { ElementRef } from "@angular/core";
import { GameFactory } from "./game.factory";
import { Camera } from "../game_object/camera";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback, IPreAnimateCallback } from "../interfaces/callback-interface";
import { Time } from "./time-util";

export abstract class GameEngine {

    private drawShape!: CanvasRenderingContext2D;
    private canvas!: ElementRef<HTMLCanvasElement>

    protected gameFactory: GameFactory = new GameFactory();
    private camera: Camera = this.gameFactory.camera;
    private animateCallbacks: IAnimateCallback[] = [];
    private preAnimateCallbacks: IPreAnimateCallback[] = [];
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
        // const dpr = window.devicePixelRatio || 1;

        // canvas.width = canvas.clientWidth * dpr;
        // canvas.height = canvas.clientHeight * dpr;

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Scale the drawing context
        // this.drawShape.scale(dpr, dpr);

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
        if (Time.isViewTime) {
            if (Time.now() - Time.prevTimeFrame >= 1000) {
                Time.fpsCount.set(Time.frameCounter());
                Time.frameCounter.set(0);
                Time.prevTimeFrame = Time.now();
            }
            Time.frameCounter.update(value => value + 1)
        }
        Time.setCurrentTime();
        this.drawShape.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // Draw the background
        this.drawShape.fillStyle = 'lightblue'; // Set background color
        this.drawShape.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        this.preAnimateCallbacks.forEach(control => control.preAnimate());
        this.animateCallbacks.forEach(control => control.animate());
        this.gameFactory.gameObjects.forEach(obj => obj.draw(this.drawShape));
        Time.setPreviousTime();
        requestAnimationFrame(() => this.draw());
    }

    private setupGameCallbacks(): void {
        this.animateCallbacks = this.gameFactory.gameControls.filter((control): control is IAnimateCallback => "animate" in control);
        this.preAnimateCallbacks = this.gameFactory.gameControls.filter((control): control is IPreAnimateCallback => "preAnimate" in control);
        this.keydownCallbacks = this.gameFactory.gameControls.filter((control): control is IKeydownCallback => "keydown" in control);
        this.keyupCallbacks = this.gameFactory.gameControls.filter((control): control is IKeyupCallback => "keyup" in control);
        
        this.animateCallbacks.push(...this.gameFactory.gameCollisions.filter((control): control is IAnimateCallback => "animate" in control));
        this.preAnimateCallbacks.push(...this.gameFactory.gameCollisions.filter((control): control is IPreAnimateCallback => "preAnimate" in control));
    }

}