import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { IAnimateCallback, IPreAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";

export abstract class GameCollision implements IMainObject, IAnimateCallback, IPreAnimateCallback {

    readonly _collisionFrom: IGameObject
    readonly _collisionTo: IGameObject
    private collisionList: GameCollision[] = []
    private gameControlList: any[] = []
    preAnchorPoint: IPoint;

    constructor(collisionFrom: IGameObject, collisionTo: IGameObject) {
        this._collisionFrom = collisionFrom
        this._collisionTo = collisionTo
        this.preAnchorPoint = collisionFrom.anchorPoint
    }
    
    mainObject(): IGameObject {
        return this._collisionFrom
    }
    
    preAnimate(): void {
        this.preAnchorPoint = this._collisionFrom.anchorPoint
    }

    animate(): void {
        // if (JSON.stringify(this.preAnchorPoint) === JSON.stringify(this._mainObject.anchorPoint)) return // do not check if main player is not moving
        
        // this.collisionList.forEach((collisionObject) => {
        //     if (this._mainObject !== collisionObject._mainObject) {
                if (this.isCollision(this._collisionFrom, this._collisionTo)) {
                    this.collisionEffect(this._collisionFrom, this._collisionTo)
                }
        //     }
        // })
    }

    // TODO check if inside camera bounds
    // !abstract isInsideCameraBounds(): boolean

    // *1 Collision checking is done on the current object
    abstract isCollision(currentObject: IGameObject, collisionObject: IGameObject): boolean

    // *2 When collision is detected there will be an effect, a transfer of energy and a change in direction of no effect
    abstract collisionEffect(currentObject: IGameObject, collisionObject: IGameObject): void

    setCollisionList(collisionObjects: GameCollision[]) {
        this.collisionList = collisionObjects;
    }

    setGameControlList(gameControls: any[]) {
        this.gameControlList = gameControls;
    }

    getGameControl<T>(classParam: { new(...args: any[]): any }, gameObject: IGameObject): T {
        return this.gameControlList.find((control) => {
            if (control instanceof classParam && '_mainObject' in control) {
                if ((control as IMainObject).mainObject() === gameObject) {
                    return true
                }
            }
            return false
        })
    }

}