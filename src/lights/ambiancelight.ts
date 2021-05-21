import {Light} from "./light";
import {Response} from "node-fetch";
import {State} from "./state";

export class AmbianceLight extends Light {

    /** Constants*/
    protected static readonly TEMP_MIN = 2000;
    protected static readonly TEMP_MAX = 6500;

    /**
     * Set temperature to a value in Kelvin.
     * @param kelvin The temperature in Kelvin as a number in the range of 2000-6500.
     */
    protected async colorTemperature(kelvin: number): Promise<Response> {
        // Make sure the temperature is a valid number
        if (kelvin < AmbianceLight.TEMP_MIN || AmbianceLight.TEMP_MAX < kelvin) {
            throw new Error(`Cannot set the temperature to ${kelvin}K. The allowed range is ${AmbianceLight.TEMP_MIN}K-${AmbianceLight.TEMP_MAX}K.`);
        }

        // Hue uses Mirek internally
        const mirek = Math.round(1000000 / kelvin);
        return this.put({"ct": mirek});
    }

    public async setState(state: State) : Promise<void> {
        await this.colorTemperature(state.temperature);
        await super.setState(state);
    }

}
