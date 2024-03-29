import { IPoint } from "../dimensions/point";
import { Camera } from "../game_object/camera";

export function worldToPixelCoordinate(canvas: CanvasRenderingContext2D, point: IPoint): IPoint {
    const canvasWidth = canvas.canvas.clientWidth;
    const canvasHeight = canvas.canvas.clientHeight;

    const camLeft = Camera.bounds.getBounds().left
    const camWidth = Camera.bounds.getWidth()
    const x = ((point.x - camLeft) / camWidth) * canvasWidth;

    const camTop = Camera.bounds.getBounds().top
    const camHeight = Camera.bounds.getHeight()
    const y = ((point.y - camTop) / camHeight) * canvasHeight;

    return { x, y };
}

export function isPointSame(a: IPoint, b: IPoint): boolean {
    return a.x === b.x && a.y === b.y;
}

export function getDecimal(number: number): number {
    return number - Math.floor(number);
}