import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { IAnimateCallback, IPreAnimateCallback } from "../interfaces/callback-interface";

export abstract class GameCollision implements IAnimateCallback, IPreAnimateCallback {

    private _currentObject: IGameObject
    private collisionList: GameCollision[] = []
    private gameControlList: any[] = []
    preAnchorPoint: IPoint;

    constructor(player: IGameObject) {
        this._currentObject = player
        this.preAnchorPoint = player.anchorPoint
    }
    
    preAnimate(): void {
        this.preAnchorPoint = this._currentObject.anchorPoint
    }

    animate(): void {
        if (JSON.stringify(this.preAnchorPoint) === JSON.stringify(this._currentObject.anchorPoint)) return
        this.collisionList.forEach((collisionObject) => {
            if (this._currentObject !== collisionObject._currentObject) {
                if (this.isCollision(this._currentObject, collisionObject._currentObject)) {
                    this._currentObject.moveAnchor({ ...this.preAnchorPoint })
                    this.collisionEffect(collisionObject._currentObject)
                }
            }
        })
    }

    // TODO check if inside camera bounds
    // !abstract isInsideCameraBounds(): boolean

    // *1 Collision checking is done on the current object
    abstract isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean

    // *2 When collision is detected there will be an effect, a transfer of energy and a change in direction of no effect
    abstract collisionEffect(gameObject: IGameObject): void

    setCollisionList(collisionObjects: GameCollision[]) {
        this.collisionList = collisionObjects;
    }

    setGameControlList(gameControls: any[]) {
        this.gameControlList = gameControls;
    }

    getGameControl<T>(fnName: string): T | undefined {
        return this.gameControlList.find((control): control is T => fnName in control)
    }

}