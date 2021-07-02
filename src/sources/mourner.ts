import {TimeSource} from "./timesource";
import {TimesOfDay} from "../timesofday";
// @ts-ignore
import * as SunCalc from "suncalc";
import {ApplicationClock} from "../applicationclock";
import {Location} from "../cli";

export class Mourner implements TimeSource {
    get(location: Location): Promise<TimesOfDay> {
        const result = SunCalc.getTimes(ApplicationClock.get(), location.latitude, location.longitude);
        result.civilTwilightBegin = result.dawn;
        result.civilTwilightEnd = result.dusk;
        result.nauticalTwilightBegin = result.nauticalDawn;
        result.nauticalTwilightEnd = result.nauticalDusk;
        result.astronomicalTwilightBegin = result.night;
        result.astronomicalTwilightEnd = result.nightEnd;
        return result;
    }
}
