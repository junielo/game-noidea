import { IGameObject } from "../dimensions/game-object";
import { IPoint } from "../dimensions/point";
import { GameCollision } from "../game_collisions/base-collision";
import { Camera } from "../game_object/camera";
import { Circle } from "../game_object/circle";
import { Rectangle } from "../game_object/rectangle";
import { LineSegment } from "../game_object/line";
import { ILine } from "../dimensions/line";
import { Polygon } from "../game_object/polygon";

export class GameFactory {

    camera: Camera = new Camera({ x: 0, y: 0 });
    gameObjects: IGameObject[] = [];
    gameControls: any[] = [];
    gameCollisions: any[] = []

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

    createLineSegment(tag: string, anchorPoint: IPoint, endPoint: IPoint, width: number): IGameObject {
        const line = new LineSegment(tag, anchorPoint, endPoint, width)
        this.gameObjects.push(line);
        return line;
    }

    createPolygon(tag: string, vertices: IPoint[]): IGameObject {
        const polygon = new Polygon(tag, vertices);
        this.gameObjects.push(polygon);
        return polygon;
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