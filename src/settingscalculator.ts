/**
 * Functional interface that defines a method to retrieve the current light settings.
 */
interface SettingsCalculator {
    get(): Promise<{brightness: number, temperature: number}>;
}
