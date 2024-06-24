import { IGameObject } from "../dimensions/game-object";
import { GameCollision } from "./base-collision";


export class BasicCircleCollision extends GameCollision {

    constructor(collisionFrom: IGameObject, collisionTo: IGameObject) {
        super(collisionFrom, collisionTo);
    }

    override isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean {
        return true
    }

    override collisionEffect(currentObject: IGameObject, collisionObject: IGameObject): void {
        
    }

}