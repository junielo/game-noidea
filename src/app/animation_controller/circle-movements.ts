import { IGameObject } from "../dimensions/game-object";
import { Circle } from "../game_object/circle";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";


export class CircleMovements implements IAnimateCallback, IKeydownCallback, IKeyupCallback {
    private circle: Circle;

    keyPress: string = '';
    keyDownCnt: number = 0;
    walkSpeed: number = 1;

    constructor(params: Circle) {
        this.circle = params;
    }

    animate(): void {
        if (this.keyPress === 'w') {
            this.circle.anchorPoint.y -= this.walkSpeed;
            this.circle.radiusPoint.y -= this.walkSpeed;
        } else if (this.keyPress === 's') {
            this.circle.anchorPoint.y += this.walkSpeed;
            this.circle.radiusPoint.y += this.walkSpeed;
        } else if (this.keyPress === 'a') {
            this.circle.anchorPoint.x -= this.walkSpeed;
            this.circle.radiusPoint.x -= this.walkSpeed;
        } else if (this.keyPress === 'd') {
            this.circle.anchorPoint.x += this.walkSpeed;
            this.circle.radiusPoint.x += this.walkSpeed;
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}