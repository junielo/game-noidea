import { Boundary, IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";

export class Camera implements IGameObject {

    anchorPoint: IPoint;
    static bounds: Boundary;
    // static defaultBounds: Boundary;
    cameraWidth: number = 100;
    cameraHeight: number = 100;
    defaultWidth: number = 100;
    defaultHeight: number = 100;
    tag: string = "camera";
    parent: IGameObject | null;
    children: IGameObject[] | null;
    bgColor: string = 'red'

    constructor(point: IPoint) {
        this.anchorPoint = { ...point };
        Camera.bounds = new Boundary({
            top: this.anchorPoint.y - this.defaultHeight / 2,
            bottom: this.anchorPoint.y + this.defaultHeight / 2,
            left: this.anchorPoint.x - this.defaultWidth / 2,
            right: this.anchorPoint.x + this.defaultWidth / 2
        });
        this.parent = null;
        this.children = [];
    }

    resetBounds() {
        this.setWidth(this.defaultWidth);
        this.setHeight(this.defaultHeight);
    }

    setBounds() {
        this.setWidth(this.cameraWidth);
        this.setHeight(this.cameraHeight);
    }

    setBGColor(color: string): void {
        // No need to set the color of the camera
    }

    draw(canvas: CanvasRenderingContext2D): void {
        // No need to draw the camera
    }

    setWidth(width: number): void {
        this.cameraWidth = width;
        Camera.bounds.getBounds().left = this.anchorPoint.x - width / 2;
        Camera.bounds.getBounds().right = this.anchorPoint.x + width / 2;
    }

    setHeight(height: number): void {
        this.cameraHeight = height;
        Camera.bounds.getBounds().top = this.anchorPoint.y - height / 2;
        Camera.bounds.getBounds().bottom =  this.anchorPoint.y + height / 2;
    }

    moveLeft(steps: number): void {
        this.anchorPoint.x -= steps;
        this.setBounds();
        this.children?.forEach(child => child.moveAnchor(this.anchorPoint));
    }

    moveRight(steps: number): void {
        this.anchorPoint.x += steps;
        this.setBounds();
        this.children?.forEach(child => child.moveAnchor(this.anchorPoint));
    }

    moveUp(steps: number): void {
        this.anchorPoint.y -= steps;
        this.setBounds();
        this.children?.forEach(child => child.moveAnchor(this.anchorPoint));
    }

    moveDown(steps: number): void {
        this.anchorPoint.y += steps;
        this.setBounds();
        this.children?.forEach(child => child.moveAnchor(this.anchorPoint));
    }

    moveAnchor(point: IPoint): void {
        this.anchorPoint = { ...point };
        this.setBounds();
    }

}