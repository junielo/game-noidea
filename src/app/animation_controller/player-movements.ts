import { IGameObject } from "../dimensions/game-object";
import { Circle } from "../game_object/circle";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";


export class PlayerMovements implements IAnimateCallback, IKeydownCallback, IKeyupCallback {

    private player: IGameObject;
    keyPress: string = '';
    walkSpeed: number = 30;

    constructor(params: IGameObject) {
        this.player = params;
    }

    animate(): void {
        if (this.keyPress === 'w') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this.player.moveAnchor({ x: this.player.anchorPoint.x, y: this.player.anchorPoint.y - walkSpeed})
        } else if (this.keyPress === 's') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this.player.moveAnchor({ x: this.player.anchorPoint.x, y: this.player.anchorPoint.y + walkSpeed})
        } else if (this.keyPress === 'a') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this.player.moveAnchor({ x: this.player.anchorPoint.x - walkSpeed, y: this.player.anchorPoint.y})
        } else if (this.keyPress === 'd') {
            const walkSpeed = this.walkSpeed * (Time.deltaTime() / Time.millisInSecond);
            this.player.moveAnchor({ x: this.player.anchorPoint.x + walkSpeed, y: this.player.anchorPoint.y})
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}