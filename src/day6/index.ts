import {Day} from "../day";

class Day6 extends Day {

    constructor() {
        super(6);
    }

    solveForPartOne(input: string): string {
        const races = this.parseInputPartOne(input);
        let numberOfWaysToWinArray: number[] = [];

        races.forEach(race => {
            let minimumWin = this.calculateMinimumWin(race);
            let maximumWin = this.calculateMaximumWin(race);
            numberOfWaysToWinArray.push(maximumWin - (minimumWin - 1));
        })

        return "" + numberOfWaysToWinArray.reduce((partialProduct, a) => partialProduct * a, 1);
    }

    solveForPartTwo(input: string): string {
        let race = this.parseInputPartTwo(input);
        let minimumWin = this.calculateMinimumWin(race);
        let maximumWin = this.calculateMaximumWin(race);
        return "" + (maximumWin - (minimumWin - 1));
    }

    parseInputPartOne(input: string) {
        const lines = input.split("\n")
        const times = lines[0].split(":")[1].trim().split(/\s+/);
        const distances = lines[1].split(":")[1].trim().split(/\s+/);
        const races = [];
        for (let i = 0; i < times.length; i++) {
            races.push(new Race(Number.parseInt(times[i]), Number.parseInt(distances[i])))
        }
        return races;
    }

    parseInputPartTwo(input: string) {
        const lines = input.split("\n")
        const times = lines[0].split(":")[1].trim().split(/\s+/);
        const distances = lines[1].split(":")[1].trim().split(/\s+/);
        return new Race(Number.parseInt(times.join("")), Number.parseInt(distances.join("")));
    }

    calculateMinimumWin(race: Race) {
        for (let i = 0; i < race.time; i++) {
            let distanceRaced = i * (race.time - i);
            if (distanceRaced > race.distance) {
                return i;
            }
        }
        return race.time;
    }

    calculateMaximumWin(race: Race) {
        for (let i = race.time; i > 0; i--) {
            let distanceRaced = i * (race.time - i);
            if (distanceRaced > race.distance) {
                return i;
            }
        }
        return race.time;
    }
}

class Race {
    time: number;
    distance: number;

    constructor(time: number, distance: number) {
        this.time = time;
        this.distance = distance;
    }
}

export default new Day6;