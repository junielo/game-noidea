import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { IAnimateCallback } from "../interfaces/callback-interface";

export abstract class Collision implements IAnimateCallback {

    readonly _player: IGameObject
    readonly _collisionObjects: Collision[]

    constructor(player: IGameObject, collisionObjects: Collision[]) {
        this._player = player
        this._collisionObjects = collisionObjects
    }

    animate(): void {
        this._collisionObjects.forEach((collisionObject) => {
            if (this._player !== collisionObject._player) {
                if (this.isCollision(collisionObject._player)) {
                    this.collisionEffect(collisionObject._player)
                }
            }
        })
    }
    
    abstract get getBoxBounds(): IBounds
    abstract get getCircleBounds(): IBounds
    abstract get getAnchorPoint(): IPoint

    // TODO get all vertex point
    // !abstract get getVertexPoints(): IPoint[]

    // TODO check if inside camera bounds
    // !abstract isInsideCameraBounds(): boolean

    // *1 Collision checking is done on the current object
    abstract isCollision(gameObject: IGameObject): boolean

    // *2 When collision is detected there will be an effect, a transfer of energy and a change in direction of no effect
    abstract collisionEffect(gameObject: IGameObject): void

}