// @ts-nocheck
import {ApplicationClock} from "../applicationclock";
import {SettingsCalculator} from "./settingscalculator";
import {State} from "../lights/state";
import {Configuration} from "../configurations/configuration";
import {TimesOfDay} from "../timesofday";
import {NoStateException} from "../no_state_exception";

/** Calculates the current brightness and temperature completely linearly. */
export class LinearCalculator implements SettingsCalculator {

    /**
     * @throws NoStateException if no state is available for the current time.
     */
    async get(timesOfDay: TimesOfDay, configuration: Configuration): Promise<State> {

        if (ApplicationClock.get().getTime() < timesOfDay.astronomicalTwilightBegin.getTime()) {
            throw NoStateException();
        }

        const times = [
            timesOfDay.astronomicalTwilightBegin,
            timesOfDay.nauticalTwilightBegin,
            timesOfDay.civilTwilightBegin,
            timesOfDay.sunrise,
            timesOfDay.solarNoon,
            timesOfDay.sunset,
            timesOfDay.civilTwilightEnd,
            timesOfDay.nauticalTwilightEnd,
            timesOfDay.astronomicalTwilightEnd,
        ];

        const states = [
            configuration.astronomicalTwilightBegin,
            configuration.nauticalTwilightBegin,
            configuration.civilTwilightBegin,
            configuration.sunrise,
            configuration.solarNoon,
            configuration.sunset,
            configuration.civilTwilightEnd,
            configuration.nauticalTwilightEnd,
            configuration.astronomicalTwilightEnd,
        ];

        for (let i = 1; i < times.length; i++) {

            const startDate = times[i - 1];
            const startState = states[i - 1];
            const endDate = times[i];
            const endState = states[i];

            if (isNaN(startDate.getTime())) {
                continue;
            }

            if (ApplicationClock.get().getTime() < startDate.getTime()) {
                return states[i - 1];
            }

            if (ApplicationClock.get().getTime() < endDate.getTime()) {
                const progress = ApplicationClock.get().progressTime(startDate, endDate);

                const result = State.progress(
                    startState,
                    endState,
                    progress,
                );

                console.log(
                    `Interval start: ${startDate.toLocaleDateString('nl-BE')} ${startDate.toLocaleTimeString('nl-BE')}\n` +
                    `Interval end: ${endDate.toLocaleDateString('nl-BE')} ${endDate.toLocaleTimeString('nl-BE')}\n` +
                    `Interval progress: ${Math.round(1000 * progress, 4) / 10}%\n` +
                    `State: {power: ${result.power}, brightness: ${result.brightness}, temperature: ${result.temperature}}`
                );

                return result;
            }
        }

        return configuration.astronomicalTwilightEnd;
    }

}
