/** Uses the https://sunrise-sunset.org/ API to calculate settings. */
export class SunsetSunrise implements SettingsSource {

    private readonly location: Location;

    constructor(cli: CommandLineArguments) {
        this.location = cli.location;
    }

    async retrieve() : Promise<Response> {
        return fetch(`https://api.sunrise-sunset.org/json?lat=${location.latitude}&lng=-${location.longitude}&date=today`);
    }

    get(): { brightness: number; temperature: number } {
        return {brightness: 0, temperature: 0};
    }

}
