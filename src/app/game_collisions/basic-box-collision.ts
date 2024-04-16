import { PhysicsMovement } from "../animation_controller/physics-movement";
import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { GameCollision } from "./collision";

export type CollisionDirection = {
    isHorizontalCollision: boolean,
    isVerticalCollision: boolean
}

export class BasicBoxCollision extends GameCollision {

    constructor(player: IGameObject) {
        super(player);
    }

    /**
     * Checks for the overlapping of the horizontal and vertical bounds of the two game objects.
     * Negative values if no overlap, 0 if the bounds are touching, and a positive number if there is overlap.
     * That is why we need to take the maximum between the result and 0 and convert it to a boolean.
     * @param currentObject - The current game object.
     * @param collisionObject - The game object to check for collision with.
     * @returns True if there is a collision, false otherwise.
     */
    override isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean {
        const isHorizontalCollision = !!Math.max(Math.min(currentObject.getBounds.right, collisionObject.getBounds.right) - Math.max(currentObject.getBounds.left, collisionObject.getBounds.left), 0)
        const isVerticalCollision = !!Math.max(Math.min(currentObject.getBounds.bottom, collisionObject.getBounds.bottom) - Math.max(currentObject.getBounds.top, collisionObject.getBounds.top), 0)
        return isHorizontalCollision && isVerticalCollision
    }

    override collisionEffect(currentObject: IGameObject, collisionObject: IGameObject): void {
        const horizontalDistance = currentObject.anchorPoint.x - collisionObject.anchorPoint.x
        const verticalDistance = currentObject.anchorPoint.y - collisionObject.anchorPoint.y

        if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
            const distanceCollision = Math.min(currentObject.getBounds.right, collisionObject.getBounds.right) - Math.max(currentObject.getBounds.left, collisionObject.getBounds.left)
            const newCurrentAnchor = currentObject.anchorPoint.x + distanceCollision * Math.sign(horizontalDistance)
            currentObject.moveAnchor({ x: newCurrentAnchor, y: currentObject.anchorPoint.y })
        } else if (Math.abs(horizontalDistance) < Math.abs(verticalDistance)) {
            const distanceCollision = Math.min(currentObject.getBounds.bottom, collisionObject.getBounds.bottom) - Math.max(currentObject.getBounds.top, collisionObject.getBounds.top)
            const newCurrentAnchor = currentObject.anchorPoint.y + distanceCollision * Math.sign(verticalDistance)
            currentObject.moveAnchor({ x: currentObject.anchorPoint.x, y: newCurrentAnchor })
        }
    }
    
}