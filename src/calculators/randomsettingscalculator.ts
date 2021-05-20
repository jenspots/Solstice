/**
 * Concrete implementation of SettingsCalculator that supplies random values for testing purposes.
 */
class RandomSettingsCalculator implements SettingsCalculator {

    get() : {brightness: number, temperature: number} {
        return {
            brightness: Math.floor(Math.random() * 255),
            temperature: Math.floor(Math.random() * 4500) + 2000,
        };
    }

}
