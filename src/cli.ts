export interface CommandLineArguments {
    ip: string,
    token: string,
    location: Location,
}

export interface Location {
    longitude: number,
    latitude: number,
}
