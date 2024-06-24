import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { getDecimal, isPointSame } from "../game_util/computations";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";

export class DelayCopyPosition implements IMainObject, IAnimateCallback, IKeydownCallback, IKeyupCallback {

    readonly _collisionFrom: IGameObject;
    private truePositionList: IPoint[] = [];
    private delayInMillis: number;
    private delayStarted: number = 0;
    private keyLastChanged: number = 0;
    private keyPress: string = '';

    constructor(gameObject: IGameObject, delayInMillis: number) {
        this._collisionFrom = gameObject;
        this.delayInMillis = delayInMillis;
        this.keyLastChanged = Time.now();
    }
    
    mainObject(): IGameObject {
        return this._collisionFrom
    }

    /**
     * The idea on the mechanics of this delay copy position constraint is to first store the true position of the followed object
     * then we will get the index where the main object needs to move by getting the time delta and dividing it by the delayInMillis and multiplying it by the length of the true position list.
     * Next is we need to interpolate movement of the main object by getting the decimal point of the computed index
     * and calculating the x and y position of the main object by subtracting the current position to the next position and multiplying it by the decimal point and add it back to the current position.
     */
    animate(): void {
        if (this.keyPress === 'w' || this.keyPress === 's' || this.keyPress === 'a' || this.keyPress === 'd') {
            if (this.delayStarted === 0){
                if (Time.now() - this.keyLastChanged > 300) {
                    this.delayStarted = Time.now();
                    this.truePositionList.push({...this._collisionFrom.anchorPoint});
                }
            }
            this.keyLastChanged = Time.now();
        }

        if (this.delayStarted !== 0) {
            if(this.truePositionList.length === 0 || !isPointSame(this.truePositionList.slice(-1)[0], this._collisionFrom.anchorPoint))
                this.truePositionList.push({...this._collisionFrom.anchorPoint});
            const timeDelta = Time.now() - this.delayStarted;
            const computed = (timeDelta / this.delayInMillis) * this.truePositionList.length;
            const index = Math.floor(computed);
            if(index < this.truePositionList.length) {
                if(index < this.truePositionList.length - 2) {
                    const decimalPoint = getDecimal(computed)
                    const x = this.truePositionList[index].x + (this.truePositionList[index + 1].x - this.truePositionList[index].x) * decimalPoint;
                    const y = this.truePositionList[index].y + (this.truePositionList[index + 1].y - this.truePositionList[index].y) * decimalPoint;
                    this._collisionFrom.moveAnchor({x, y});
                } else {
                    this._collisionFrom.moveAnchor({...this.truePositionList[index]});
                }
            } else {
                this.delayStarted = 0;
                this.truePositionList = [];
            }
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }
    
}