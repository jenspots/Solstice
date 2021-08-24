import "./date";
import {config} from "dotenv";
import { Engine } from "./engine";

// Load .env variables
config();

// Run the engine
new Engine({
    ip: process.env.IP as string,
    token: process.env.TOKEN as string,
    location: {
        longitude: Number.parseInt(process.env.LONGITUDE as string),
        latitude: Number.parseInt(process.env.LATITUDE as string),
    },
    lights: process.env.LIGHTS?.split(",").map(i => Number.parseInt(i)) as Array<number>,
}).run();
