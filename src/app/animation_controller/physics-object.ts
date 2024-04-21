import { IGameObject } from "../dimensions/game-object";
import { Time } from "../game_util/time-util";
import { IAnimateCallback } from "../interfaces/callback-interface";
import { IMainObject } from "../interfaces/game-object";


export class PhysicsObject implements IMainObject, IAnimateCallback {

    protected force: number;
    protected force_x: number = 0;
    protected force_y: number = 0;
    protected mass: number;
    protected transferred_mass: number = 0;
    protected opposing_force: number;
    readonly _mainObject: IGameObject;

    constructor(gameObject: IGameObject, force: number, mass: number, opposing_force: number) {
        this._mainObject = gameObject;
        this.force = force;
        this.mass = mass;
        this.opposing_force = opposing_force;
    }

    animate(): void {
        if (Math.abs(this.force_x) > 0) {
            this.force_x = this.computeOpposedForce(this.force_x)
            this._mainObject.moveAnchor({ 
                x: this._mainObject.anchorPoint.x + this.computeDistance(this.force_x), 
                y: this._mainObject.anchorPoint.y 
            })
        } 
        if (Math.abs(this.force_y) > 0) {
            this.force_y = this.computeOpposedForce(this.force_y)
            this._mainObject.moveAnchor({ 
                x: this._mainObject.anchorPoint.x, 
                y: this._mainObject.anchorPoint.y + this.computeDistance(this.force_y) 
            })
        }
    }

    mainObject(): IGameObject {
        return this._mainObject
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
        const acceleration = force / (this.mass + this.transferred_mass)
        const distance = 0.5 * acceleration * (Math.pow(Time.deltaTime(), 2) / Time.millisInSecond)
        this.transferred_mass = 0;
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