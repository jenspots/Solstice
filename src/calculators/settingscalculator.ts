import {State} from "../lights/state";

/** Functional interface that defines a method to retrieve the current light settings. */
export interface SettingsCalculator {
    get(): Promise<State>;
}
