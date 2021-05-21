/** Instances of this interface model the current or desired state of a light. */
export class State {

    public brightness: number;
    public temperature: number;
    public power: boolean;

    public constructor(brightness: number, temperature: number, power: boolean) {
        this.brightness =  brightness;
        this.temperature = temperature;
        this.power = power;
    }

    /**
     * Return a new State object that is in between the start and end state.
     * @param start The State at the start.
     * @param end The state at the end.
     * @param percentage How much progress has been made.
     */
    public static progress(start: State, end: State, percentage: number) : State {
        if (percentage < 0 || percentage > 1) {
            throw Error(`Invalid percentage supplied. Value must be between 0.0 and 1.0. Given value: ${percentage}.`);
        }

        return {
            brightness: Math.round(start.brightness + (end.brightness - start.brightness) * percentage),
            temperature: Math.round(start.temperature + (end.temperature - start.temperature) * percentage),
            power: start.power || end.power,
        };
    }

}
