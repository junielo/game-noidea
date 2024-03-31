import { Signal, signal } from "@angular/core";

export class Time {

    private static currentTime : number 
    private static previousTime : number
    private static readonly timeSpeed: number = 1000;

    static isViewTime: boolean = false
    static prevTimeFrame: number = 0
    static frameCounter = signal(0)
    static fpsCount = signal(0)

    /**
     * The purpose of this function is to multiply it to the distance they want to move the object per second.
     * This is to make the movement of the object consistent regardless of the frame rate.
     * @returns the time difference between the current time and the previous time divided by the constant speed of 1 second
     */
    static deltaTime() : number {
        return (Time.currentTime - Time.previousTime) / Time.timeSpeed
    }

    static setCurrentTime() {
        Time.currentTime = performance.now()
    }

    static setPreviousTime(time: number = Time.currentTime) {
        Time.previousTime = time
    }

    static now() : number {
        return performance.now()
    }

}