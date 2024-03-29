import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { getDecimal, isPointSame } from "../game_util/computations";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";

export class DelayTransition implements IAnimateCallback, IKeydownCallback, IKeyupCallback {

    private gameObject: IGameObject;
    private truePositionList: IPoint[] = [];
    private delayInMillis: number;
    private delayStarted: number = 0;
    private keyLastChanged: number = 0;
    private keyPress: string = '';

    constructor(gameObject: IGameObject, delayInMillis: number) {
        this.gameObject = gameObject;
        this.delayInMillis = delayInMillis;
        this.keyLastChanged = Time.now();
    }

    animate(): void {
        if (this.keyPress === 'w' || this.keyPress === 's' || this.keyPress === 'a' || this.keyPress === 'd') {
            if (this.delayStarted === 0){
                if (Time.now() - this.keyLastChanged > 300) {
                    this.delayStarted = Time.now();
                    this.truePositionList.push({...this.gameObject.anchorPoint});
                }
            }
            this.keyLastChanged = Time.now();
        }

        if (this.delayStarted !== 0) {
            if(this.truePositionList.length === 0 || !isPointSame(this.truePositionList.slice(-1)[0], this.gameObject.anchorPoint))
                this.truePositionList.push({...this.gameObject.anchorPoint});
            const timeDelta = Time.now() - this.delayStarted;
            const computed = (timeDelta / this.delayInMillis) * this.truePositionList.length;
            const index = Math.floor(computed);
            if(index < this.truePositionList.length) {
                if(index < this.truePositionList.length - 2) {
                    const decimalPoint = getDecimal(computed)
                    const x = this.truePositionList[index].x + (this.truePositionList[index + 1].x - this.truePositionList[index].x) * decimalPoint;
                    const y = this.truePositionList[index].y + (this.truePositionList[index + 1].y - this.truePositionList[index].y) * decimalPoint;
                    this.gameObject.moveAnchor({x, y});
                } else {
                    this.gameObject.moveAnchor({...this.truePositionList[index]});
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