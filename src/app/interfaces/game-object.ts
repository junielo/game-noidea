import { IGameObject } from "../dimensions/game-object";

export interface IMainObject {
    readonly _mainObject: IGameObject
    mainObject(): IGameObject
}