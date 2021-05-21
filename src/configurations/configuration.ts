import {State} from "../lights/state";
import {readFileSync} from 'fs';

/** Indicates how the lights should be set at certain times of day. */
export interface Configuration {
    sunrise: State;
    sunset: State;
    solarNoon: State;
    civilTwilightBegin: State;
    nauticalTwilightBegin: State;
    astronomicalTwilightBegin: State;
    civilTwilightEnd: State;
    nauticalTwilightEnd: State;
    astronomicalTwilightEnd: State;
}

/**
 * Load a configuration JSON file.
 * @param url The URL which indicates where the JSON file is located.
 */
export function loadConfiguration(url: string) : Configuration {
    // TODO: Add error handling.
    const raw = readFileSync(url,'utf8');
    return JSON.parse(raw) as Configuration;
}
