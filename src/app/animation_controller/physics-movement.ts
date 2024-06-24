import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback, IPreAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";
import { PhysicsObject } from "./physics-object";

export class PhysicsMovement extends PhysicsObject implements IPreAnimateCallback, IKeydownCallback, IKeyupCallback {

    private keyPress: string = '';
    preAnchorPoint: IPoint;

    constructor(gameObject: IGameObject, force: number, mass: number, opposing_force: number) {
        super(gameObject, force, mass, opposing_force);
        this.preAnchorPoint = this._collisionFrom.anchorPoint
    }

    preAnimate(): void {

        if (this.keyPress === 'w') {
            this.force_y = 0 - this.force
        } else if (this.keyPress === 's') {
            this.force_y = this.force
        } else if (this.keyPress === 'a') {
            this.force_x = 0 - this.force
        } else if (this.keyPress === 'd') {
            this.force_x = this.force
        }
    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}