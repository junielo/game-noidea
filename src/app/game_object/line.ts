import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";


class Line implements IGameObject {
    anchorPoint: IPoint;
    tag: string;
    parent: IGameObject | null;
    bgColor: string;

    endPoint: IPoint;

    constructor(tag: string, anchorPoint: IPoint, endPoint: IPoint) {
        this.tag = tag;
        this.anchorPoint = anchorPoint;
        this.parent = null;
        this.bgColor = 'red';

        this.endPoint = endPoint;
    }

    draw(canvas: CanvasRenderingContext2D): void {
        throw new Error("Method not implemented.");
    }

    setBGColor(color: string): this {
        this.bgColor = color;
        return this;
    }

    moveAnchor(point: IPoint): void {
        throw new Error("Method not implemented.");
    }

    get getBounds(): IBounds {
        throw new Error("Method not implemented.");
    }

}