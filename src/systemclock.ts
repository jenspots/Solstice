/** Singleton pattern of a Date object. By making Solstice rely on this specific Date instance we can easily manipulate
 * time for testing purpose. Also, this allows the user to choose a "current time" that is different from the real
 * system clock.*/
export class SystemClock {

    private static instance: Date;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): Date {
        if (!SystemClock.instance) {
            SystemClock.instance = new Date();
        }

        return SystemClock.instance;
    }

    /** Sets the SystemClock instance to the current time. */
    public static align(): void {
        SystemClock.instance = new Date();
    }

}
