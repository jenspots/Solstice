import {State} from "../lights/state";
import {Configuration} from "../configurations/configuration";
import {TimesOfDay} from "../timesofday";

/** Functional interface that defines a method to retrieve the current light settings. */
export interface SettingsCalculator {
    get(timesOfDay: TimesOfDay, configuration: Configuration): Promise<State>;
}
