import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { GameCollision } from "../game_collisions/collision";
import { Camera } from "../game_object/camera";
import { Circle } from "../game_object/circle";
import { Rectangle } from "../game_object/rectangle";

export class GameFactory {

    camera: Camera = new Camera({ x: 0, y: 0 });
    gameObjects: IGameObject[] = [];
    gameControls: any[] = [];
    gameCollisions: GameCollision[] = []

    createCircle(tag: string, centerPoint: IPoint, radius: number): IGameObject {
        const circle = new Circle(tag, centerPoint, radius);
        this.gameObjects.push(circle);
        return circle;
    }

    createRectangle(tag: string, centerPoint: IPoint, width: number, height: number): IGameObject {
        const rectangle = new Rectangle(tag, centerPoint, width, height);
        this.gameObjects.push(rectangle);
        return rectangle;
    }

    addGameControls(animControl: any): any {
        this.gameControls.push(animControl);
        return animControl;
    }

    addGameCollision(gameCollision: GameCollision): GameCollision {
        this.gameCollisions.push(gameCollision)
        gameCollision.setCollisionList(this.gameCollisions)
        gameCollision.setGameControlList(this.gameControls)
        return gameCollision
    }

}