export interface IAnimateCallback {
    animate(): void;
}

export interface IKeydownCallback {
    keydown(event: KeyboardEvent): void;
}

export interface IKeyupCallback {
    keyup(event: KeyboardEvent): void;
}