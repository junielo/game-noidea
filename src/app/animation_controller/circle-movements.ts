import { IGameObject } from "../dimensions/game-object";
import { Circle } from "../game_object/circle";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";


export class CircleMovements implements IAnimateCallback, IKeydownCallback, IKeyupCallback {

    private circle: Circle;
    keyPress: string = '';
    walkSpeed: number = 30;

    constructor(params: Circle) {
        this.circle = params;
    }

    animate(): void {
        const walkSpeed = this.walkSpeed * Time.deltaTime();
        if (this.keyPress === 'w') {
            this.circle.anchorPoint.y -= walkSpeed;
            this.circle.radiusPoint.y -= walkSpeed;
        } else if (this.keyPress === 's') {
            this.circle.anchorPoint.y += walkSpeed;
            this.circle.radiusPoint.y += walkSpeed;
        } else if (this.keyPress === 'a') {
            this.circle.anchorPoint.x -= walkSpeed;
            this.circle.radiusPoint.x -= walkSpeed;
        } else if (this.keyPress === 'd') {
            this.circle.anchorPoint.x += walkSpeed;
            this.circle.radiusPoint.x += walkSpeed;
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}