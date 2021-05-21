import fetch from 'node-fetch';
import {CommandLineArguments, Location} from '../cli';
import {TimesOfDay} from "../timesofday";
import {SettingsSource} from "./settingssource";

/** Uses the https://sunrise-sunset.org/ API to calculate settings. */
export class SunriseSunset implements SettingsSource {

    /** How long a TimesOfDay object may be cached in minutes. */
    private static readonly TIME_TO_LIVE: number = 120;

    /** The requested location described as a Location instance. */
    private readonly location: Location;
    private readonly date: () => Date;

    /** Date that indicates the creation of the cache. */
    private ageOfCache: Date | null = null;

    /** Cached TimesOfDay instance. */
    private cache: TimesOfDay | null = null;

    constructor(cli: CommandLineArguments) {
        this.location = cli.location;
        this.date = cli.date;
    }

    /** Indicates whether or not the cache is still valid using TIME_TO_LIVE. */
    private expired() : boolean {
        if (!this.ageOfCache) {
            return false;
        }
        return this.date() >= this.ageOfCache.addMinutes(SunriseSunset.TIME_TO_LIVE);
    }

    async get() : Promise<TimesOfDay> {
        // If the cache is still valid, return it.
        if (!this.expired() && this.cache) {
            return this.cache;
        }

        // Retrieve data from API.
        const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${this.location.latitude}&lng=-${this.location.longitude}&date=${this.date().toISOString()}&formatted=0`);

        // Interpret as JSON.
        const json = await res.json(); // TODO: Handle possible errors.

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
