import { IGameObject } from "../dimensions/game-object";
import { Time } from "../game_util/time-util";
import { IAnimateCallback, IKeydownCallback, IKeyupCallback } from "../interfaces/callback-interface";

export class PhysicsMovement implements IAnimateCallback, IKeydownCallback, IKeyupCallback {

    private physicsMovement = 'physicsMovement'

    private force: number;
    private force_x: number = 0;
    private force_y: number = 0;
    private mass: number;
    private opposing_force: number;
    private gameObject: IGameObject;
    private keyPress: string = '';

    constructor(gameObject: IGameObject, force: number, mass: number, opposing_force: number) {
        this.gameObject = gameObject;
        this.force = force;
        this.mass = mass;
        this.opposing_force = opposing_force;
    }
    

    animate(): void {

        if (this.keyPress === 'w') {
            this.force_y = 0 - this.force
        } else if (this.keyPress === 's') {
            this.force_y = this.force
        } else if (this.keyPress === 'a') {
            this.force_x = 0 - this.force
        } else if (this.keyPress === 'd') {
            this.force_x = this.force
        }

        if (Math.abs(this.force_x) > 0) {
            this.force_x = this.computeOpposedForce(this.force_x)
            this.gameObject.moveAnchor({ 
                x: this.gameObject.anchorPoint.x + this.computeDistance(this.force_x), 
                y: this.gameObject.anchorPoint.y 
            })
        } 
        if (Math.abs(this.force_y) > 0) {
            this.force_y = this.computeOpposedForce(this.force_y)
            this.gameObject.moveAnchor({ 
                x: this.gameObject.anchorPoint.x, 
                y: this.gameObject.anchorPoint.y + this.computeDistance(this.force_y) 
            })
        }
    }

    /**
     * @param force 
     * @returns Previous force minus the opposing force times the time interval
     */
    private computeOpposedForce(force: number): number {
        const timeInterval = Time.deltaTime() / Time.millisInSecond;
        const opposedForce = Math.max(Math.abs(force) - this.opposing_force * timeInterval, 0) * Math.sign(force)
        return opposedForce
    }

    /**
     * @param force 
     * @returns distance traveled by the object in the time delta
     */
    private computeDistance(force: number): number {
        const acceleration = force / this.mass
        const distance = 0.5 * acceleration * (Math.pow(Time.deltaTime(), 2) / Time.millisInSecond)
        return distance

    }

    keydown(event: KeyboardEvent): void {
        this.keyPress = event.key;
    }

    keyup(event: KeyboardEvent): void {
        if (this.keyPress === event.key) this.keyPress = ''
    }

}