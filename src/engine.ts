import {Light} from "./lights/light";
import {AmbianceLight} from "./lights/ambiancelight";
import {getLight} from "./lights/factory";
import {CommandLineArguments} from "./cli";

export class Engine {

    // Constants
    private static readonly TIMEOUT: number = 1000;

    // Variables
    private readonly url: string;
    private readonly lights: Array<Light> = [];
    private readonly settingsSource: SettingsSource = new RandomSettingsSource();

    constructor(args: CommandLineArguments) {
        // Construct the URL.
        this.url = `http://${args.ip}/api/${args.token}`;

        // TODO: Retrieve which lights should be controlled from the CLI arguments.
        getLight(`${this.url}/lights/2/`).then(light => this.lights.push(light));
    }

    /**
     * Infinite loop that acts as our "engine".
     */
    async run(): Promise<void> {
        while (true) {
            // Retrieve the current required brightness and temperature.
            const {brightness, temperature} = this.settingsSource.get();

            // Go over each light and set it's values accordingly.
            for (const light of this.lights) {
                if (light instanceof AmbianceLight) {
                    light.colorTemperature(temperature);
                }
                light.brightnessAbsolute(brightness);
            }

            // Wait before reiterating.
            await new Promise(e => setTimeout(e, Engine.TIMEOUT));
        }
    }

}
