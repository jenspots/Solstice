import {Light} from "./lights/light";
import {getLight} from "./lights/factory";
import {CommandLineArguments} from "./cli";
import {SystemClock} from "./systemclock";
import {SettingsCalculator} from "./calculators/settingscalculator";

export class Engine {

    // Constants
    private static readonly TIMEOUT: number = 1000;

    // Variables
    private readonly url: string;
    private readonly lights: Array<Light> = [];
    private readonly settingsCalculator: SettingsCalculator;

    constructor(args: CommandLineArguments) {
        // Construct the URL.
        this.url = `http://${args.ip}/api/${args.token}`;

        // Retrieve a light for each element in args.lights.
        for (const index of args.lights) {
            getLight(`${this.url}/lights/${index}/`).then(light => this.lights.push(light));
        }

        // Assign the SettingsCalculator.
        this.settingsCalculator = args.settingsCalculator;
    }

    /**
     * Infinite loop that acts as our "engine".
     */
    async run(): Promise<void> {
        while (true) {
            // Retrieve the current required brightness and temperature.
            const state = await this.settingsCalculator.get();

            // Go over each light and set it's values accordingly.
            for (const light of this.lights) {
                light.setState(state);
            }

            // Wait before reiterating.
            await new Promise(e => setTimeout(e, Engine.TIMEOUT));
        }
    }

}
