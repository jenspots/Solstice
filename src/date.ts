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

        /**
         * Calculate the progress of this Date instance between two other Date objects without taking year, month, and
         * and day into consideration.
         * @param start
         * @param end
         */
        progressTime(start: Date, end: Date) : number;

        /**
         * Return a new Date object that has advanced a given amount of minutes.
         * @param minutes How many minutes to progress the new Date instance.
         */
        addMinutes(minutes: number) : Date

        /**
         * Return a new Date object that has advanced a given amount of hours.
         * @param hours How many hours to progress the new Date instance.
         */
        addHours(hours: number) : Date
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

Date.prototype.progressTime = function(start: Date, end: Date) : number {
    const _start = new Date(start);
    _start.setUTCFullYear(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
    const _end = new Date(end);
    _end.setUTCFullYear(this.getUTCFullYear(), this.getUTCMonth(), this.getUTCDate());
    return this.progress(_start, _end);
};

Date.prototype.addMinutes = function(minutes: number) : Date {
    const result = new Date(this);
    result.setUTCMinutes(result.getUTCMinutes() + minutes);
    return result;
};

Date.prototype.addHours = function(hours: number) : Date {
    const result = new Date(this);
    result.setUTCHours(result.getUTCMinutes() + hours);
    return result;
};

export {};
