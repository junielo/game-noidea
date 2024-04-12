import { retry } from "rxjs";
import { IGameObject } from "../dimensions/game-object";
import { IAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";

export class CopyPositionConstraint implements IMainObject, IAnimateCallback {
    
    readonly _mainObject: IGameObject;
    followTo: IGameObject;

    constructor(followFrom: IGameObject, followTo: IGameObject) {
        this._mainObject = followFrom;
        this.followTo = followTo;
    }

    mainObject(): IGameObject {
        return this._mainObject;
    }

    animate(): void {
        this.followTo.moveAnchor({...this._mainObject.anchorPoint});
    }

}