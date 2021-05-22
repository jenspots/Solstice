import {Light} from "./lights/light";
import {getLight} from "./lights/factory";
import {Arguments, CommandLineArguments} from "./cli";
import {SystemClock} from "./systemclock";
import {SettingsCalculator} from "./calculators/settingscalculator";

export class Engine {

    /** How much time needs to pass before performing a tick. */
    private static readonly TIMEOUT: number = 100;

    /** How much time to advance the SystemClock per tick in minutes. */
    private static readonly ADVANCE: number = 0;

    // Variables
    private readonly url: string;
    private readonly lights: Array<Light> = [];
    private readonly settingsCalculator: SettingsCalculator;

    constructor() {
        const args = Arguments.getInstance();

        // Construct the URL.
        this.url = `http://${args.ip}/api/${args.token}`;

        // Retrieve a light for each element in args.lights.
        for (const index of args.lights) {
            getLight(`${this.url}/lights/${index}/`).then(light => this.lights.push(light));
        }

        // Assign the SettingsCalculator.
        this.settingsCalculator = args.settingsCalculator(args.settingsSource());
    }

    /** Infinite loop that acts as our "engine". */
    async run() : Promise<void> {
        while (true) {
            await this.tick();
            await new Promise(e => setTimeout(e, Engine.TIMEOUT));
        }
    }

    /** Retrieves the current requested state and sets the lights to match that State instance. */
    private async tick(): Promise<void> {
        // Chang the SystemClock to the current time or advance it by Engine.ADVANCE minutes.
        if (Engine.ADVANCE == 0) SystemClock.align();
        else SystemClock.getInstance().setMinutes(SystemClock.getInstance().getMinutes() + Engine.ADVANCE);

        // Retrieve the current required brightness and temperature.
        const state = await this.settingsCalculator.get();

        // Go over each light and set it's values accordingly.
        for (const light of this.lights) {
            await light.setState(state);
        }
    }

}
