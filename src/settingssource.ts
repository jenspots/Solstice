import {TimesOfDay} from "./sources/timesofday";

/**
 * Functional interface that defines a method to retrieve the current light settings/
 */
export interface SettingsSource {
    get(): Promise<TimesOfDay>;
}
