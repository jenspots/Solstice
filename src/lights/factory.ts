import fetch from 'node-fetch';

import {Light} from "./light";
import {AmbianceLight} from "./ambiancelight";
import {ColorLight} from "./colorlight";

/**
 * Return the requested light with polymorphism.
 * @param url The locator of the requested light.
 */
export async function getLight(url: string) : Promise<Light> {
    const res = await fetch(url);
    const json = await res.json();
    if (json.type === "Extended color light") {
        return new ColorLight(url);
    } else if (json.type === "Color temperature light") {
        return new AmbianceLight(url);
    } else {
        return new Light(url);
    }
}
