import {State} from "../lights/state";
import {readFileSync} from 'fs';

/** Indicates how the lights should be set at certain times of day. */
export class Configuration {

    sunrise: State;
    sunset: State;
    solarNoon: State;
    civilTwilightBegin: State;
    nauticalTwilightBegin: State;
    astronomicalTwilightBegin: State;
    civilTwilightEnd: State;
    nauticalTwilightEnd: State;
    astronomicalTwilightEnd: State;

    /** This constructor mainly exists to make the TS Compiler happy. */
    constructor(
        sunrise: State, sunset: State, solarNoon: State, civilTwilightBegin: State, nauticalTwilightBegin: State,
        astronomicalTwilightBegin: State, civilTwilightEnd: State, nauticalTwilightEnd: State,
        astronomicalTwilightEnd: State
    ) {
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.solarNoon = solarNoon;
        this.civilTwilightBegin = civilTwilightBegin;
        this.nauticalTwilightBegin = nauticalTwilightBegin;
        this.astronomicalTwilightBegin = astronomicalTwilightBegin;
        this.civilTwilightEnd = civilTwilightEnd;
        this.nauticalTwilightEnd = nauticalTwilightEnd;
        this.astronomicalTwilightEnd = astronomicalTwilightEnd;
    }

    /**
     * Load a configuration JSON file.
     * @param url The URL which indicates where the JSON file is located.
     * @returns A new configuration instance.
     * @todo Handle errors.
     */
    static load(url: string) : Configuration {
        const raw = readFileSync(url,'utf8');
        return JSON.parse(raw) as Configuration;
    }

}
