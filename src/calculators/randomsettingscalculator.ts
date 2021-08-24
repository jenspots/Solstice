import {SettingsCalculator} from "./settingscalculator";
import {State} from "../lights/state";
import {Configuration} from "../configurations/configuration";
import {TimesOfDay} from "../timesofday";

/** Concrete implementation of SettingsCalculator that supplies random values for testing purposes. */
export class RandomSettingsCalculator implements SettingsCalculator {

    async get(timesOfDay: TimesOfDay, configuration: Configuration): Promise<State> {
        return {
            brightness: Math.floor(Math.random() * 255),
            temperature: Math.floor(Math.random() * 4500) + 2000,
            power: Math.round(Math.random()) == 1,
        };
    }

}
