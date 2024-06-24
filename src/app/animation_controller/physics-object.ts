import { IGameObject } from "../dimensions/game-object";
import { Time } from "../game_util/time-util";
import { IAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";


export class PhysicsObject implements IMainObject, IAnimateCallback {

    protected speed: number =  25;
    protected force: number;
    protected force_x: number = 0;
    protected force_y: number = 0;
    protected mass: number;
    protected transferred_mass: number = 0;
    protected opposing_force: number;
    readonly _collisionFrom: IGameObject;

    constructor(gameObject: IGameObject, force: number, mass: number, opposing_force: number) {
        this._collisionFrom = gameObject;
        this.force = force;
        this.mass = mass;
        this.opposing_force = opposing_force;
    }

    animate(): void {
        if (Math.abs(this.force_x) > 0) {
            this.force_x = this.computeOpposedForce(this.force_x)
            this._collisionFrom.moveAnchor({ 
                x: this._collisionFrom.anchorPoint.x + this.computeDistance(this.force_x, (force: number) => { this.force_x = force }), 
                y: this._collisionFrom.anchorPoint.y 
            })
        } 
        if (Math.abs(this.force_y) > 0) {
            this.force_y = this.computeOpposedForce(this.force_y)
            this._collisionFrom.moveAnchor({ 
                x: this._collisionFrom.anchorPoint.x, 
                y: this._collisionFrom.anchorPoint.y + this.computeDistance(this.force_y, (force: number) => { this.force_y = force }) 
            })
        }
    }

    mainObject(): IGameObject {
        return this._collisionFrom
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
    private computeDistance(force: number, fn: (force: number) => void): number {
        const timeInterval = Time.deltaTime() / Time.millisInSecond;
        const acceleration = force / (this.mass + this.transferred_mass)
        const distance = (0.5 * acceleration) * (Math.pow(this.speed * timeInterval, 2))
        fn(acceleration * this.mass)
        this.transferred_mass = 0
        return distance
    }

    get getHorizontalForce(): number {
        return this.force_x
    }

    set setHorizontalForce(force: number) {
        this.force_x = force
    }

    get getVerticalForce(): number {
        return this.force_y
    }

    set setVerticalForce(force: number) {
        this.force_y = force
    }

    get getMass(): number {
        return this.mass
    }

    set transferMass(mass: number) {
        this.transferred_mass = mass
    }

}