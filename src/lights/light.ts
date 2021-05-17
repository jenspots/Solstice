import fetch, { Response } from 'node-fetch';

export class Light {

    /** Constants*/
    private static readonly MAX_BRIGHTNESS = 255;

    /** The URL of the light. */
    private readonly url: string;

    /** The URL of the light's state. */
    get state() : string {
        return `${this.url}state`;
    }

    constructor(url: string) {
        this.url = url;
    }

    /**
     * Send a PUT request.
     * @param body The body of the request as JS object.
     */
    protected async put(body: unknown) : Promise<Response> {
        return fetch(this.state, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    /** Send a GET request. */
    protected async get() : Promise<Response> {
        return fetch(this.url);
    }

    /**
     * Toggle lights on or off.
     * @param status if true, set the light to on. If false, set the light to off. If null, toggle to other state.
     */
    async power(status: boolean | null = null): Promise<Response> {
        if (status === null) {
            const res = await this.get();
            const json = await res.json();
            const status = json.state.on;
            return this.power(!status);
        } else {
            return this.put({"on": status}).finally(null);
        }
    }

    /**
     * Set brightness as an 8-bit absolute value.
     * @param brightness The brightness as a number in the range of 0-255.
     */
    async brightnessAbsolute(brightness: number) : Promise<Response>  {
        // Make sure the brightness is a valid number.
        if (brightness < 0 || brightness > Light.MAX_BRIGHTNESS) {
            throw new Error(`Cannot set the brightness to ${brightness}. The maximum is ${Light.MAX_BRIGHTNESS}`);
        }

        return this.put({"bri": brightness});
    }

}
