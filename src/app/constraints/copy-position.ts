import { IGameObject } from "../dimensions/game-object";
import { IAnimateCallback } from "../interfaces/callback-interface";

export class CopyPositionConstraint implements IAnimateCallback {
    
    followFrom: IGameObject;
    followTo: IGameObject;

    constructor(followFrom: IGameObject, followTo: IGameObject) {
        this.followFrom = followFrom;
        this.followTo = followTo;
    }

    animate(): void {
        this.followTo.moveAnchor({...this.followFrom.anchorPoint});
    }

}