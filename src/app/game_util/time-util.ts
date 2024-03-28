

export class Time {

    private static currentTime : number 
    private static previousTime : number
    private static timeSpeed : number = 1000

    static deltaTime() : number {
        return (Time.currentTime - Time.previousTime) / Time.timeSpeed
    }

    static setCurrentTime() {
        Time.currentTime = performance.now()
    }

    static setPreviousTime(time: number = Time.currentTime) {
        Time.previousTime = time
    }

}