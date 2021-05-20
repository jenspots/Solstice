export interface CommandLineArguments {
    ip: string,
    token: string,
    location: Location,
    date: () => Date,
}

export interface Location {
    longitude: number,
    latitude: number,
}
