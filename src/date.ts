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

Date.fromString = function(ISOString: string) : Date {
    return new Date(Date.parse(ISOString));
};

export {};
