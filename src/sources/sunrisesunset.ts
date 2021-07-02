import fetch from 'node-fetch';
import {Location} from '../cli';
import {TimesOfDay} from "../timesofday";
import {TimeSource} from "./timesource";
import {ApplicationClock} from "../applicationclock";

/** Uses the https://sunrise-sunset.org/ API to calculate settings. */
export class SunriseSunset implements TimeSource {

    /** How long a TimesOfDay object may be cached in minutes. */
    private static readonly TIME_TO_LIVE: number = 8 * 60;

    /** Date that indicates the creation of the cache. */
    private ageOfCache: Date | null = null;

    /** Cached TimesOfDay instance. */
    private cache: TimesOfDay | null = null;

    /** Indicates whether or not the cache is still valid using TIME_TO_LIVE. */
    private expired() : boolean {
        if (!this.ageOfCache || !this.cache) {
            return true;
        }
        return ApplicationClock.get() >= this.ageOfCache.addMinutes(SunriseSunset.TIME_TO_LIVE);
    }

    async get(location: Location) : Promise<TimesOfDay> {
        /* If the cache is still valid, return it. */
        if (!this.expired() && this.cache) {
            return this.cache;
        }

        console.log("Calculating solar times.");

        /* Retrieve data from API. */
        const res = await fetch(
            `https://api.sunrise-sunset.org/json?` +
            `lat=${location.latitude}&` +
            `lng=-${location.longitude}&` +
            `date=${ApplicationClock.get().toISOString()}` +
            `&formatted=0`
        );

        /* Interpret as JSON. */
        const json = await res.json(); // TODO: Handle possible errors.

        /* Update the cache age. */
        this.ageOfCache = new Date(ApplicationClock.get());

        /* Assign the cache. */
        this.cache = {
            sunrise: Date.fromString(json.results.sunrise),
            sunset: Date.fromString(json.results.sunset),
            solarNoon: Date.fromString(json.results.solar_noon),
            civilTwilightBegin: Date.fromString(json.results.civil_twilight_begin),
            nauticalTwilightBegin: Date.fromString(json.results.nautical_twilight_begin),
            astronomicalTwilightBegin: Date.fromString(json.results.astronomical_twilight_begin),
            civilTwilightEnd: Date.fromString(json.results.civil_twilight_end),
            nauticalTwilightEnd: Date.fromString(json.results.nautical_twilight_end),
            astronomicalTwilightEnd: Date.fromString(json.results.astronomical_twilight_end),
        };

        return this.cache;
    }

}
