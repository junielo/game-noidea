import { ElementRef } from "@angular/core";
import { GameFactory } from "./game.factory";

export abstract class GameEngine {

    private drawShape!: CanvasRenderingContext2D;
    private canvas!: ElementRef<HTMLCanvasElement>

    protected gameFactory: GameFactory = new GameFactory();

    protected setCanvasRef(canvas: ElementRef<HTMLCanvasElement>): void {
        this.canvas = canvas;
        this.drawShape = canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        this.scaleCanvas();
        this.draw();
    }

    abstract animate(canvas: CanvasRenderingContext2D): void;

    private draw(): void {
        this.drawShape.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // Draw the background
        this.drawShape.fillStyle = 'lightblue'; // Set background color
        this.drawShape.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        this.animate(this.drawShape);
        this.gameFactory.gameObjects.forEach(obj => obj.draw(this.drawShape));
        requestAnimationFrame(() => this.draw());
    }

    protected scaleCanvas(): void {
        const canvas = this.canvas.nativeElement;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;

        // Scale the drawing context
        this.drawShape.scale(dpr, dpr);
    }

}