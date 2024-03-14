import { IPoint } from "./point";

export interface IBounds {
    top: number;
    bottom: number;
    left: number;
    right: number;
}

export class Boundary {
    private bounds: IBounds;

    constructor(bounds: IBounds) {
        this.bounds = bounds;
    }

    getBounds(): IBounds {
        return this.bounds;
    }

    getWidth(){
        return this.bounds.right - this.bounds.left;
    }

    getHeight(){
        return this.bounds.bottom - this.bounds.top;
    }

    isWithinBounds(point: IPoint): boolean {
        return point.x >= this.bounds.left && point.x <= this.bounds.right
            && point.y >= this.bounds.top && point.y <= this.bounds.bottom;
    }
}