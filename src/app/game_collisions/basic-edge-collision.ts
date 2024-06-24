import { IGameObject } from "../dimensions/game-object";
import { ILine } from "../dimensions/line";
import { Circle } from "../game_object/circle";
import { LineSegment } from "../game_object/line";
import { getLineAngle, addDegrees, getRotatedPointFromOrigin, isIntersect, getAbsoluteDistance } from "../game_util/computations";
import { GameCollision } from "./base-collision";

export class BasicEdgeCollision extends GameCollision {

    constructor(collisionFrom: IGameObject, collisionTo: IGameObject) {
        super(collisionFrom, collisionTo);
    }

    override isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean {
        if (currentObject instanceof Circle && collisionObject instanceof LineSegment) {
            return this.circleEdgeCollision(currentObject, collisionObject)
        }
        else {
            return false;
        }
    }

    override collisionEffect(currentObject: IGameObject, collisionObject: IGameObject): void {
        // TODO implement collision effect
    }

    private circleEdgeCollision(currentObject: Circle, collisionObject: LineSegment): boolean {
        const lineAngle = getLineAngle(collisionObject.anchorPoint, collisionObject.endPoint);
        const rayAngle1 = addDegrees(lineAngle, 90);
        const rayAngle2 = addDegrees(lineAngle, 270);
        currentObject.bgColor = 'green';
        
        const testIntersectA = getRotatedPointFromOrigin(currentObject.anchorPoint, rayAngle1, currentObject.radius);
        const testIntersectB = getRotatedPointFromOrigin(currentObject.anchorPoint, rayAngle2, currentObject.radius);

        const lineA: ILine = { poinA: currentObject.anchorPoint, pointB: testIntersectA }
        const lineB: ILine = { poinA: currentObject.anchorPoint, pointB: testIntersectB }
        const lineIntersect: ILine = { poinA: collisionObject.anchorPoint, pointB: collisionObject.endPoint }
        
        if (isIntersect(lineA, lineIntersect)) {
            currentObject.bgColor = 'red';
            return true;
        } else if (isIntersect(lineB, lineIntersect)) {
            currentObject.bgColor = 'red';
            return true;
        }

        // Check distance end to end of line to circle
        if (getAbsoluteDistance(currentObject.anchorPoint, collisionObject.anchorPoint) < currentObject.radius) {
            currentObject.bgColor = 'red';
            return true;
        } else if (getAbsoluteDistance(currentObject.anchorPoint, collisionObject.endPoint) < currentObject.radius) {
            currentObject.bgColor = 'red';
            return true;
        }
        return false;
    }

}