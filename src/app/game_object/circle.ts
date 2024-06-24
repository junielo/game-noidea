import { IBounds } from "../dimensions/boundary";
import { IGameObject as IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { worldToPixelCoordinate } from "../game_util/computations";

export class Circle implements IGameObject{

    tag: string;
    parent: IGameObject | null;
    bgColor: string = 'green'

    anchorPoint: IPoint;
    radiusPoint: IPoint;
    radius: number;

    testIntersectA!: IPoint;
    testIntersectB!: IPoint;

    constructor(tag: string, centerPoint: IPoint, radius: number) {
        this.anchorPoint = centerPoint;
        this.radiusPoint = { x: centerPoint.x + radius, y: centerPoint.y };
        this.radius = radius;

        this.tag = tag;
        this.parent = null;
    }

    get getBounds(): IBounds {
        return {
            top: this.anchorPoint.y - this.radius,
            bottom: this.anchorPoint.y + this.radius,
            left: this.anchorPoint.x - this.radius,
            right: this.anchorPoint.x + this.radius
        }
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

        if (this.testIntersectA) {
            // console.log('anchorPoint', this.anchorPoint)
            // console.log('testIntersectA', this.testIntersectA)
            const newIntersectA = worldToPixelCoordinate(canvas, this.testIntersectA);
            canvas.beginPath();
            canvas.moveTo(newCenter.x, newCenter.y);
            canvas.lineTo(newIntersectA.x, newIntersectA.y);
            canvas.lineWidth = 3;
            canvas.strokeStyle = 'blue';
            canvas.stroke();
        }
        if (this.testIntersectB) {
            const newIntersectB = worldToPixelCoordinate(canvas, this.testIntersectB);
            canvas.beginPath();
            canvas.moveTo(newCenter.x, newCenter.y);
            canvas.lineTo(newIntersectB.x, newIntersectB.y);
            canvas.lineWidth = 3;
            canvas.strokeStyle = 'blue';
            canvas.stroke();
        }
    }

    moveAnchor(point: IPoint): void {
        // this.anchorPoint = { ...point };
        this.anchorPoint.x = point.x;
        this.anchorPoint.y = point.y;
        this.radiusPoint = { x: point.x + this.radius, y: point.y };
    }
}