import { ILine } from "../dimensions/line";
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

export function worldToPixelWidth(canvas: CanvasRenderingContext2D, width: number, height: number): [number, number] {
    const canvasWidth = canvas.canvas.clientWidth;
    const camWidth = Camera.bounds.getWidth()
    const newWidth = (width / camWidth) * canvasWidth;

    const canvasHeight = canvas.canvas.clientHeight;
    const camHeight = Camera.bounds.getHeight()
    const newHeight = (height / camHeight) * canvasHeight;
    return [newWidth, newHeight];
}

export function isPointSame(a: IPoint, b: IPoint): boolean {
    return a.x === b.x && a.y === b.y;
}

export function getDecimal(number: number): number {
    return number - Math.floor(number);
}

export function getAbsoluteDistance(A: IPoint, B: IPoint): number {
    return Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2));
}

export function getLineAngle(startPoint: IPoint, endPoint: IPoint): number {
    // Calculate differences in x and y coordinates
    const deltaX = endPoint.x - startPoint.x;
    const deltaY = endPoint.y - startPoint.y;

    // Calculate the angle in radians
    const angleInRadians = Math.atan2(deltaY, deltaX);

    // Convert angle from radians to degrees
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    // Ensure the angle is in the range [0, 360)
    const normalizedAngle = (angleInDegrees + 360) % 360;

    return normalizedAngle;
}

export function addDegrees(angle: number, degreesToSubtract: number): number {
    let result = angle + degreesToSubtract;
    
    // Normalize the result to be within [0, 360)
    result = (result % 360 + 360) % 360;

    return result;
}

export function getRotatedPointFromOrigin(point: IPoint, angleInDegrees: number, radius: number): IPoint {
    // Convert angle from degrees to radians
    const angleInRadians = angleInDegrees * (Math.PI / 180);

    // Calculate the change in x and y
    const dx = radius * Math.cos(angleInRadians);
    const dy = radius * Math.sin(angleInRadians);

    // Calculate the second vertex coordinates
    const x2 = point.x + dx;
    const y2 = point.y + dy;

    return { x: x2, y: y2 };
}

// These following functions is for getting the intersection point of two lines
export function isIntersect(lineA: ILine, lineB: ILine): boolean {
    // Find the four orientations needed for the general and special cases
    const x1 = lineA.pointA.x;
    const y1 = lineA.pointA.y;
    const x2 = lineA.pointB.x;
    const y2 = lineA.pointB.y;
    const x3 = lineB.pointA.x;
    const y3 = lineB.pointA.y;
    const x4 = lineB.pointB.x;
    const y4 = lineB.pointB.y;

    const o1 = orientation(x1, y1, x2, y2, x3, y3);
    const o2 = orientation(x1, y1, x2, y2, x4, y4);
    const o3 = orientation(x3, y3, x4, y4, x1, y1);
    const o4 = orientation(x3, y3, x4, y4, x2, y2);

    // General case
    if (o1 !== o2 && o3 !== o4) return true;

    // Special cases
    // x1, y1, x2, y2, x3, y3 are collinear and x3, y3 lies on segment x1y1x2y2
    if (o1 === 0 && onSegment(x1, y1, x3, y3, x2, y2)) return true;

    // x1, y1, x2, y2, x4, y4 are collinear and x4, y4 lies on segment x1y1x2y2
    if (o2 === 0 && onSegment(x1, y1, x4, y4, x2, y2)) return true;

    // x3, y3, x4, y4, x1, y1 are collinear and x1, y1 lies on segment x3y3x4y4
    if (o3 === 0 && onSegment(x3, y3, x1, y1, x4, y4)) return true;

    // x3, y3, x4, y4, x2, y2 are collinear and x2, y2 lies on segment x3y3x4y4
    if (o4 === 0 && onSegment(x3, y3, x2, y2, x4, y4)) return true;

    // Doesn't fall in any of the above cases
    return false;
}

function orientation(px: number, py: number, qx: number, qy: number, rx: number, ry: number): number {
    const val = (qy - py) * (rx - qx) - (qx - px) * (ry - qy);
    if (val === 0) return 0; // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
}

function onSegment(px: number, py: number, qx: number, qy: number, rx: number, ry: number): boolean {
    return (qx <= Math.max(px, rx) && qx >= Math.min(px, rx) &&
            qy <= Math.max(py, ry) && qy >= Math.min(py, ry));
}
// End of intersection point functions