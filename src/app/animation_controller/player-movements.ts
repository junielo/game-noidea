import { IGameObject } from "../dimensions/game-object";
import { Circle } from "../game_object/circle";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";


export class PlayerMovements implements IMainObject, IAnimateCallback, IKeydownCallback, IKeyupCallback {

    readonly _mainObject: IGameObject;
    keyPress: string = '';
    walkSpeed: number = 30;

    constructor(params: IGameObject) {
        this._mainObject = params;
    }

    mainObject(): IGameObject {
        throw new Error("Method not implemented.");
    }

    animate(): void {
        if (this.keyPress === 'w') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this._mainObject.moveAnchor({ x: this._mainObject.anchorPoint.x, y: this._mainObject.anchorPoint.y - walkSpeed})
        } else if (this.keyPress === 's') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this._mainObject.moveAnchor({ x: this._mainObject.anchorPoint.x, y: this._mainObject.anchorPoint.y + walkSpeed})
        } else if (this.keyPress === 'a') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this._mainObject.moveAnchor({ x: this._mainObject.anchorPoint.x - walkSpeed, y: this._mainObject.anchorPoint.y})
        } else if (this.keyPress === 'd') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this._mainObject.moveAnchor({ x: this._mainObject.anchorPoint.x + walkSpeed, y: this._mainObject.anchorPoint.y})
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}