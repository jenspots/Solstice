/**
 * Extension of the Date class.
 */

declare global {
    interface DateConstructor {
        /**
         * Construct new Date instance based off of a string object.
         * @param ISOString Date represented using the ISO standard.
         */
        fromString(ISOString: string): Date;
    }
}

declare global {
    interface Date {
        /**
         * Calculate the progress of this Date instance between two other Date objects.
         * @param start
         * @param end
         */
        progress(start: Date, end: Date) : number;
    }
}

Date.fromString = function(ISOString: string) : Date {
    return new Date(Date.parse(ISOString));
};

Date.prototype.progress = function(start: Date, end: Date) : number {
    // The end Date instance must be greater than the start Date instance.
    if (end <= start) {
        throw Error("Date.prototype.progress: The end date you provided is not greater than the start date.");
    }

    // If `this` not after start, return 0.
    if (this <= start) {
        return 0;
    }

    // If `this` is not before end, return 1.
    if (this >= end) {
        return 1;
    }

    // Simple calculation that returns the progress.
    return (this.getTime() - start.getTime()) / (end.getTime() - start.getTime());
};

export {};
