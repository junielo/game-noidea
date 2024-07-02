import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { ILine } from "../dimensions/line";
import { IPoint } from "../dimensions/point";
import { worldToPixelCoordinate } from "../game_util/computations";


export class Polygon implements IGameObject {
    anchorPoint: IPoint;
    tag: string;
    bgColor: string;

    vertices: IPoint[];

    constructor(tag: string, edges: IPoint[]) {
        this.tag = tag;
        this.bgColor = 'black';

        this.vertices = edges;
        this.anchorPoint = {
            x: this.getBounds.left + (this.getBounds.right - this.getBounds.left) / 2,
            y: this.getBounds.top + (this.getBounds.bottom - this.getBounds.top) / 2
        }
    }
    
    get getBounds(): IBounds {
        const xlist = this.vertices.map((vertex: IPoint) => vertex.x);
        const ylist = this.vertices.map((vertex: IPoint) => vertex.x);

        const sortedXList = xlist.flat().sort((a, b) => a - b);
        const sortedYList = ylist.flat().sort((a, b) => a - b);

        return {
            top: sortedYList[0],
            bottom: sortedYList[sortedYList.length - 1],
            left: sortedXList[0],
            right: sortedXList[sortedXList.length - 1]
        }
    }

    draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = this.bgColor;
        canvas.beginPath();
        canvas.strokeStyle = this.bgColor;
        const { x, y } = worldToPixelCoordinate(canvas, this.vertices[0]);
        canvas.moveTo(x, y);
        for (let i = 1; i < this.vertices.length; i++) {
            const { x, y } = worldToPixelCoordinate(canvas, this.vertices[i]);
            canvas.lineTo(x, y);
        }
        canvas.closePath();
        canvas.fill();
    }

    setBGColor(color: string): this {
        this.bgColor = color;
        return this;
    }

    moveAnchor(point: IPoint): void {
        // TODO implement this
    }
    
}