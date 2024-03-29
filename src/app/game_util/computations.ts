import { IPoint } from "../dimensions/point";
import { Camera } from "../game_object/camera";

/**
 * Converts world coordinates to pixel coordinates based on the canvas and camera settings.
 * The idea is to give every object a world position and move them around in the world space
 * instead of moving them around in the pixel space.
 * For the object to be rendered in the screen I created a camera that has bounds, then the
 * coordinates of the object are converted to pixel coordinates based on the camera bounds.
 */
export function worldToPixelCoordinate(canvas: CanvasRenderingContext2D, point: IPoint): IPoint {
    // Get the canvas actual width and height by pixel
    const canvasWidth = canvas.canvas.clientWidth;
    const canvasHeight = canvas.canvas.clientHeight;

    /**
     * We get first the location of the object from our camera bounds
     * then we convert it to percentage based on the camera width or height
     * then we multiply it by the actual canvas width or height to get the pixel coordinate
     */
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