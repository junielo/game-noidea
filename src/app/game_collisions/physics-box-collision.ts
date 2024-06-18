import { PhysicsMovement } from "../animation_controller/physics-movement";
import { PhysicsObject } from "../animation_controller/physics-object";
import { IGameObject } from "../dimensions/game-object";
import { GameCollision } from "./base-collision";


export class PhysicsBoxCollision extends GameCollision {

    constructor(player: IGameObject) {
        super(player);
    }

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

        const currentObjectPhysics = this.getGameControl<PhysicsObject>(PhysicsObject, currentObject)
        const collisionObjectPhysics = this.getGameControl<PhysicsObject>(PhysicsObject, collisionObject)

        currentObjectPhysics.transferMass = collisionObjectPhysics.getMass
        collisionObjectPhysics.setHorizontalForce = currentObjectPhysics.getHorizontalForce
        collisionObjectPhysics.setVerticalForce = currentObjectPhysics.getVerticalForce
    }

}