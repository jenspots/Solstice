/** Singleton pattern of a Date object. By making Solstice rely on this specific Date instance we can easily manipulate
 * time for testing purpose. Also, this allows the user to choose a "current time" that is different from the actual
 * system clock. */
export class ApplicationClock {

    private static instance: Date;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static get(): Date {
        if (!ApplicationClock.instance) {
            ApplicationClock.instance = new Date();
        }

        return ApplicationClock.instance;
    }

    /** Sets the Applicationclock instance to the current time. */
    public static align(): void {
        ApplicationClock.instance = new Date();
    }

}
