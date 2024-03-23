import { Signal } from "@angular/core";
import { IPoint } from "./point";

export interface IGameObject {
    anchorPoint: IPoint;
    tag: string;
    parent: IGameObject | null;
    bgColor: string;
    draw(canvas: CanvasRenderingContext2D): void;
    setBGColor(color: string): this;
    moveAnchor(point: IPoint): void;
}