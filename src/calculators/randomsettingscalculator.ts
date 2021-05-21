/**
 * Concrete implementation of SettingsCalculator that supplies random values for testing purposes.
 */
import {SettingsCalculator} from "./settingscalculator";

class RandomSettingsCalculator implements SettingsCalculator {

    async get() : Promise<{brightness: number, temperature: number}> {
        return {
            brightness: Math.floor(Math.random() * 255),
            temperature: Math.floor(Math.random() * 4500) + 2000,
        };
    }

}
