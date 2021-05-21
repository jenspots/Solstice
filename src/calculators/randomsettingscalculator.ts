import {SettingsCalculator} from "./settingscalculator";
import {State} from "../lights/state";

/** Concrete implementation of SettingsCalculator that supplies random values for testing purposes. */
class RandomSettingsCalculator implements SettingsCalculator {

    async get() : Promise<State> {
        return {
            brightness: Math.floor(Math.random() * 255),
            temperature: Math.floor(Math.random() * 4500) + 2000,
            power: Math.round(Math.random()) == 1,
        };
    }

}
