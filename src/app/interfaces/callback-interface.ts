import { IPoint } from "../dimensions/point";

export interface IAnimateCallback {
    animate(): void;
}

export interface IPreAnimateCallback {
    preAnchorPoint: IPoint;
    preAnimate(): void;
}

export interface IKeydownCallback {
    keydown(event: KeyboardEvent): void;
}

export interface IKeyupCallback {
    keyup(event: KeyboardEvent): void;
}