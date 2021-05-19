import fetch from 'node-fetch';
import {CommandLineArguments, Location} from '../cli';

export interface TimesOfDay {
    // TODO
}

/** Uses the https://sunrise-sunset.org/ API to calculate settings. */
export class SunriseSunset implements SettingsSource {

    /** The requested location described as a Location instance. */
    private readonly location: Location = {latitude: 1.5643, longitude: 1.456};

    constructor(cli: CommandLineArguments) {
        this.location = cli.location;
    }

    private async request() : Promise<TimesOfDay> {
        // Retrieve data from API.
        const res = await fetch(`https://api.sunrise-sunset.org/json?lat=${this.location.latitude}&lng=-${this.location.longitude}&date=today&formatted=0`);

        // Interpret as JSON.
        const json = await res.json(); // TODO: Handle possible errors.

        return {
            // TODO
        };
    }

    // TODO
    get(): { brightness: number; temperature: number } {
        return {brightness: 0, temperature: 0};
    }

}
