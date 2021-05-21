/**
 * Functional interface that defines a method to retrieve the current light settings.
 */
export interface SettingsCalculator {
    get(): Promise<{brightness: number, temperature: number}>;
}
