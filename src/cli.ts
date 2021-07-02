/** Interfaces that contain all the parameters that may be provided at launch. */
export interface CommandLineArguments {

    /** The IP address of the Hue bridge. */
    ip: string,

    /** The JWT that provides access to the Hue bridge. */
    token: string,

    /** The location for which TimesOfDay instances will be generated. */
    location: Location,

    /** Array containing the identifiers of the lights that need to be controlled.*/
    lights: Array<number>,
}

/** Data class that holds a two dimensional location. */
export interface Location {

    /** Longitude as a floating number. */
    longitude: number,

    /** Latitude as a floating number. */
    latitude: number,
}
