/** Interfaces that contain all the parameters that may be provided at launch. */
import {SettingsCalculator} from "./calculators/settingscalculator";
import {SettingsSource} from "./sources/settingssource";

export interface CommandLineArguments {

    /** The IP address of the Hue bridge. */
    ip: string,

    /** The JWT that provides access to the Hue bridge. */
    token: string,

    /** The location for which TimesOfDay instances will be generated. */
    location: Location,

    /** The date for which TimesOfDay instances will be generated. Since Solstice may run for multiple days at a time,
     * this has to be a function since this allows to define a lambda which returns the current day and therefore is not
     * constant variable.*/
    date: () => Date,

    /** Array containing the identifiers of the lights that need to be controlled.*/
    lights: Array<number>,

    /** Function that allows for the creation of a SettingsCalculator instance. */
    settingsCalculator: (source: SettingsSource) => SettingsCalculator,

    /** Function that allows for the creation of a SettingsSource instance. */
    settingsSource: () => SettingsSource
}

/** Data class that holds a two dimensional location. */
export interface Location {

    /** Longitude as a floating number. */
    longitude: number,

    /** Latitude as a floating number. */
    latitude: number,
}
