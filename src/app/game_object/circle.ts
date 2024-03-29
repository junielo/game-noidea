import { IGameObject as IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { worldToPixelCoordinate } from "../game_util/computations";

export class Circle implements IGameObject{
    tag: string;
    parent: IGameObject | null;
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
    }
    
    setBGColor(color: string): this {
        this.bgColor = color;
        return this;
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

    moveAnchor(point: IPoint): void {
        this.anchorPoint = { ...point };
        this.radiusPoint = { x: point.x + this.radius, y: point.y };
    }
}