import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { Camera } from "../game_object/camera";
import { Circle } from "../game_object/circle";

export class GameFactory {

    camera: Camera = new Camera({ top: -150, bottom: 150, left: -150, right: 150 });
    gameObjects: IGameObject[] = [];

    createCircle(tag: string, centerPoint: IPoint, radius: number): IGameObject {
        const circle = new Circle(tag, centerPoint, radius);
        this.gameObjects.push(circle);
        return circle;
    }


}