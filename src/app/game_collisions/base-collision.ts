import { IBounds } from "../dimensions/boundary";
import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { IAnimateCallback, IPreAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";

export abstract class GameCollision implements IMainObject, IAnimateCallback, IPreAnimateCallback {

    readonly _mainObject: IGameObject
    private collisionList: GameCollision[] = []
    private gameControlList: any[] = []
    preAnchorPoint: IPoint;

    constructor(player: IGameObject) {
        this._mainObject = player
        this.preAnchorPoint = player.anchorPoint
    }
    
    mainObject(): IGameObject {
        return this._mainObject
    }
    
    preAnimate(): void {
        this.preAnchorPoint = this._mainObject.anchorPoint
    }

    animate(): void {
        if (JSON.stringify(this.preAnchorPoint) === JSON.stringify(this._mainObject.anchorPoint)) return
        this.collisionList.forEach((collisionObject) => {
            if (this._mainObject !== collisionObject._mainObject) {
                if (this.isCollision(this._mainObject, collisionObject._mainObject)) {
                    this.collisionEffect(this._mainObject, collisionObject._mainObject)
                }
            }
        })
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