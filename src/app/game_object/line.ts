import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { getLineAngle, worldToPixelCoordinate } from "../game_util/computations";


export class LineSegment implements IGameObject {
    anchorPoint: IPoint;
    tag: string;
    parent: IGameObject | null;
    bgColor: string;

    endPoint: IPoint;
    width: number;

    constructor(tag: string, anchorPoint: IPoint, endPoint: IPoint, width: number) {
        this.tag = tag;
        this.anchorPoint = anchorPoint;
        this.parent = null;
        this.bgColor = 'black';

        this.endPoint = endPoint;
        this.width = width;
    }

    draw(canvas: CanvasRenderingContext2D): void {
        const newAnchor = worldToPixelCoordinate(canvas, this.anchorPoint);
        const newEnd = worldToPixelCoordinate(canvas, this.endPoint);
        canvas.beginPath();
        canvas.moveTo(newAnchor.x, newAnchor.y);
        canvas.lineTo(newEnd.x, newEnd.y);
        canvas.lineWidth = this.width;
        canvas.strokeStyle = this.bgColor;
        canvas.stroke();
    }

    setBGColor(color: string): this {
        this.bgColor = color;
        return this;
    }

    get getBounds(): IBounds {
        return {
            top: Math.min(this.anchorPoint.y, this.endPoint.y),
            bottom: Math.max(this.anchorPoint.y, this.endPoint.y),
            left: Math.min(this.anchorPoint.x, this.endPoint.x),
            right: Math.max(this.anchorPoint.x, this.endPoint.x)
        }
    }

    moveAnchor(point: IPoint): void {
        // no implementation needed
    }

}