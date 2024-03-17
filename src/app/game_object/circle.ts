import { IGameObject as IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { worldToPixelCoordinate } from "../game_util/converters";

export class Circle implements IGameObject{
    tag: string;
    parent: IGameObject | null;
    children: IGameObject[] | null;
    bgColor: string = 'red'

    anchorPoint: IPoint;
    radiusPoint: IPoint;
    radius: number;

    constructor(tag: string, centerPoint: IPoint, radius: number) {
        this.anchorPoint = centerPoint;
        this.radiusPoint = { x: centerPoint.x + radius, y: centerPoint.y };
        this.radius = radius;

        this.tag = tag;
        this.parent = null;
        this.children = [];
    }
    
    setBGColor(color: string): void {
        this.bgColor = color;
    }

    draw(canvas: CanvasRenderingContext2D): void {
        const newCenter = worldToPixelCoordinate(canvas, this.anchorPoint);
        const newRadius = worldToPixelCoordinate(canvas, this.radiusPoint);
        canvas.beginPath();
        const rad = newRadius.x - newCenter.x;
        canvas.arc(newCenter.x, newCenter.y, rad, 0, 2 * Math.PI);
        canvas.fillStyle = this.bgColor;
        canvas.fill();
    }

    moveLeft(steps: number): void {
        this.anchorPoint.x -= steps;
        this.radiusPoint.x -= steps;
        this.children?.forEach(child => child.moveLeft(steps));
    }

    moveRight(steps: number): void {
        this.anchorPoint.x += steps;
        this.radiusPoint.x += steps;
        this.children?.forEach(child => child.moveRight(steps));
    }

    moveUp(steps: number): void {
        this.anchorPoint.y -= steps;
        this.radiusPoint.y -= steps;
        this.children?.forEach(child => child.moveUp(steps));
    }

    moveDown(steps: number): void {
        this.anchorPoint.y += steps;
        this.radiusPoint.y += steps;
        this.children?.forEach(child => child.moveDown(steps));
    }

    moveAnchor(point: IPoint): void {
        this.anchorPoint = { ...point };
        this.radiusPoint = { x: point.x + this.radius, y: point.y };
    }

}