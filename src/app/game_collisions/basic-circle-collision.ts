import { IGameObject } from "../dimensions/game-object";
import { GameCollision } from "./base-collision";


export class BasicCircleCollision extends GameCollision {

    constructor(player: IGameObject) {
        super(player);
    }

    override isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean {
        return true
    }

    override collisionEffect(currentObject: IGameObject, collisionObject: IGameObject): void {
        
    }

}