/** Data class which holds the times of day. */
export interface TimesOfDay {
    sunrise: Date;
    sunset: Date;
    solarNoon: Date;
    civilTwilightBegin: Date;
    nauticalTwilightBegin: Date;
    astronomicalTwilightBegin: Date;
    civilTwilightEnd: Date;
    nauticalTwilightEnd: Date;
    astronomicalTwilightEnd: Date;
}
