/**
 * Functional interface that defines a method to retrieve the current light settings/
 */
interface SettingsSource {
    get(): {brightness: number, temperature: number};
}
