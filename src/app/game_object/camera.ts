import { Boundary, IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";

export class Camera implements IGameObject {

    static bounds: Boundary;
    tag: string = "camera";
    parent: IGameObject | null;
    children: IGameObject[] | null;
    bgColor: string = 'red'

    constructor(bounds: IBounds) {
        Camera.bounds = new Boundary(bounds);
        this.parent = null;
        this.children = [];
    }

    setBGColor(color: string): void {
        // No need to set the color of the camera
    }

    draw(canvas: CanvasRenderingContext2D): void {
        // No need to draw the camera
    }

    moveLeft(steps: number): void {
        Camera.bounds.getBounds().left -= steps;
        Camera.bounds.getBounds().right -= steps;
        this.children?.forEach(child => child.moveLeft(steps));
    }

    moveRight(steps: number): void {
        Camera.bounds.getBounds().right += steps;
        Camera.bounds.getBounds().left += steps;
        this.children?.forEach(child => child.moveRight(steps));
    }

    moveUp(steps: number): void {
        Camera.bounds.getBounds().top -= steps;
        Camera.bounds.getBounds().bottom -= steps;
        this.children?.forEach(child => child.moveUp(steps));
    }

    moveDown(steps: number): void {
        Camera.bounds.getBounds().bottom += steps;
        Camera.bounds.getBounds().top += steps;
        this.children?.forEach(child => child.moveDown(steps));
    }

}