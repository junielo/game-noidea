import { IPoint } from "./point";

export interface IGameObject {
    anchorPoint: IPoint;
    tag: string;
    parent: IGameObject | null;
    children: IGameObject[] | null;
    bgColor: string;
    draw(canvas: CanvasRenderingContext2D): void;
    setBGColor(color: string): void;
    moveLeft(steps: number): void;
    moveRight(steps: number): void;
    moveUp(steps: number): void;
    moveDown(steps: number): void;
    moveAnchor(point: IPoint): void;
}