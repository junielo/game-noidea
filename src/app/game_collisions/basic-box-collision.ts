import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { Collision } from "./collision-interface";

export class BasicBoxCollision extends Collision {

    constructor(player: IGameObject, collisionObjects: Collision[]) {
        super(player, collisionObjects);
    }

    override get getBoxBounds(): IBounds {
        
    }

    override get getCircleBounds(): IBounds {
        
    }

    override get getAnchorPoint(): IPoint {
        
    }

    override isCollision(gameObject: IGameObject): boolean {
        
    }

    override collisionEffect(gameObject: IGameObject): void {
        
    }

}