import { IGameObject } from "../dimensions/game-object";

export interface IMainObject {
    readonly _collisionFrom: IGameObject
    mainObject(): IGameObject
}