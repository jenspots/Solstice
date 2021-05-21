import {State} from "../lights/state";

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
