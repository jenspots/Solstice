import {Light} from "./lights/light";
import {getLight} from "./lights/factory";
import {CommandLineArguments, Location} from "./cli";
import {ApplicationClock} from "./applicationclock";
import {SettingsCalculator} from "./calculators/settingscalculator";
import {SunriseSunset} from "./sources/sunrisesunset";
import {TimeSource} from "./sources/timesource";
import {LinearCalculator} from "./calculators/linearcalculator";
import {Configuration} from "./configurations/configuration";
import {Mourner} from "./sources/mourner";

export class Engine {

    /** How much time needs to pass before performing a tick. */
    private static readonly TIMEOUT: number = 1000; //60 * 1000;

    /** How much time to advance the SystemClock per tick in minutes. */
    private static readonly ADVANCE: number = 30;

    // Variables
    private readonly baseURL: string;
    private readonly lights: Array<Light>;
    private readonly settingsCalculator: SettingsCalculator;
    private readonly timeSource: TimeSource;
    private readonly location: Location;
    private readonly configuration: Configuration;

    constructor(args: CommandLineArguments) {
        this.baseURL = `http://${args.ip}/api/${args.token}`;
        this.location = args.location;
        this.timeSource = new Mourner();
        this.settingsCalculator = new LinearCalculator();
        this.lights = [];
        this.configuration = Configuration.load("./src/configurations/dummy.json");

        // Retrieve a light for each element in args.lights.
        for (const index of args.lights) {
            getLight(`${this.baseURL}/lights/${index}/`).then(light => this.lights.push(light));
        }
    }

    /** Infinite loop that acts as our "engine". */
    async run() : Promise<void> {
        while (true) {
            // Chang the ApplicationClock to the current time or advance it by Engine.ADVANCE minutes.
            if (Engine.ADVANCE == 0) ApplicationClock.align();
            else ApplicationClock.addMinutes(Engine.ADVANCE);

            console.log(`Application Time: ${ApplicationClock.get().toLocaleString("nl-BE")}`);
            await Promise.all([
                this.tick(),
                new Promise(e => setTimeout(e, Engine.TIMEOUT)),
            ]);
            console.log(''); // newline
        }
    }

    /** Retrieves the current requested state and sets the lights to match that State instance. */
    private async tick(): Promise<void[]> {
        const timesOfDay = this.timeSource.get(this.location);
        const state = await this.settingsCalculator.get(await timesOfDay, this.configuration);

        return Promise.all(
            this.lights.map(light => light.setState(state))
        );
    }

}
