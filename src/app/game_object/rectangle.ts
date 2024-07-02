import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { worldToPixelCoordinate, worldToPixelWidth as worldToPixelWidthHeight } from "../game_util/computations";

export class Rectangle implements IGameObject {
    tag: string;
    bgColor: string = 'red'

    anchorPoint: IPoint;
    width: number;
    height: number;

    constructor(tag: string, centerPoint: IPoint, width: number, height: number) {
        this.anchorPoint = centerPoint;
        this.width = width;
        this.height = height;

        this.tag = tag;
    }

    get getBounds(): IBounds {
        return {
            top: this.anchorPoint.y - this.height / 2,
            bottom: this.anchorPoint.y + this.height / 2,
            left: this.anchorPoint.x - this.width / 2,
            right: this.anchorPoint.x + this.width / 2
        }
    }

    setBGColor(color: string): this {
        this.bgColor = color;
        return this;
    }

    draw(canvas: CanvasRenderingContext2D): void {
        const newCenter = worldToPixelCoordinate(canvas, this.anchorPoint);
        const [newWidth, newHeight] = worldToPixelWidthHeight(canvas, this.width, this.height);

        canvas.beginPath();
        canvas.rect(newCenter.x - newWidth / 2, newCenter.y - newHeight / 2, newWidth, newHeight);
        canvas.fillStyle = this.bgColor;
        canvas.fill();
    }

    moveAnchor(point: IPoint): void {
        this.anchorPoint = { ...point };
    }
}