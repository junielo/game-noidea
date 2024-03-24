import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { isPointSame } from "../game_util/converters";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";

/**
 * When either the w, a, s, or d key is pressed:
 *   If delayStarted is 0:
 *     The delayStarted will be set to the current time in Millisseconds.
 *     
 * In Animation Frame:
 *   If delayStarted is not 0:
 *     The gameObject's position will be saved to truePositionList.
 *     If the current time in Millisseconds minus delayStarted is less than delayInMillis:
 *       The gameObject will not move. [Assign the index 0 of truePositionList]
 *     If the current time in Millisseconds minus delayStarted is greater than delayInMillis:
 *       Divide the delayInMillis by the difference between current time in Millisseconds and delayStarted.
 *       Multiply the result above by the truePositionList size to get the index for the delayed position
 *       If the result above is less than the truePositionList size
 *         Assign the result index above to the gameObject's position
 *       Else
 *         Make delayStarted equal to 0
 *         Empty the truePositionList array
 */

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
        this.keyLastChanged = performance.now();
    }

    animate(): void {
        if (this.keyPress === 'w' || this.keyPress === 's' || this.keyPress === 'a' || this.keyPress === 'd') {
            if (this.delayStarted === 0){
                if (performance.now() - this.keyLastChanged > 300) {
                    this.delayStarted = performance.now();
                    this.truePositionList.push({...this.gameObject.anchorPoint});
                }
            }
            this.keyLastChanged = performance.now();
        }

        if (this.delayStarted !== 0) {
            if(this.truePositionList.length === 0 || !isPointSame(this.truePositionList.slice(-1)[0], this.gameObject.anchorPoint))
                this.truePositionList.push({...this.gameObject.anchorPoint});
            const timeDelta = performance.now() - this.delayStarted;
            const index = Math.round((timeDelta / this.delayInMillis) * this.truePositionList.length);
            if(index < this.truePositionList.length) {
                // console.log(this.truePositionList[index]);
                this.gameObject.moveAnchor({...this.truePositionList[index]});
            } else {
                // console.log(this.truePositionList)
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