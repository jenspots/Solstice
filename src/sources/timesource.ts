import {TimesOfDay} from "../timesofday";
import {Location} from "../cli";

/** Functional interface that defines a method for retrieving a TimesOfDay instance. */
export interface TimeSource {
    get(location: Location): Promise<TimesOfDay>;
}
