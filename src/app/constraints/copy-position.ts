import { IGameObject } from "../dimensions/game-object";
import { IAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";

export class CopyPositionConstraint implements IMainObject, IAnimateCallback {
    
    readonly _collisionFrom: IGameObject;
    followTo: IGameObject;

    constructor(followFrom: IGameObject, followTo: IGameObject) {
        this._collisionFrom = followFrom;
        this.followTo = followTo;
    }

    mainObject(): IGameObject {
        return this._collisionFrom;
    }

    animate(): void {
        this.followTo.moveAnchor({...this._collisionFrom.anchorPoint});
    }

}