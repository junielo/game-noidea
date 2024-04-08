import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { Camera } from "../game_object/camera";
import { Circle } from "../game_object/circle";

export class GameFactory {

    camera: Camera = new Camera({ x: 0, y: 0 });
    gameObjects: IGameObject[] = [];
    gameControls: any[] = [];

    createCircle(tag: string, centerPoint: IPoint, radius: number): IGameObject {
        const circle = new Circle(tag, centerPoint, radius);
        this.gameObjects.push(circle);
        return circle;
    }

    addGameControls(animControl: any): void {
        this.gameControls.push(animControl);
    }

}