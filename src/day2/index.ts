import {Day} from "../day";

class Day2 extends Day {

    constructor() {
        super(2);
    }

    solveForPartOne(input: string): string {
        const redMax = 12;
        const greenMax = 13;
        const blueMax = 14;
        let games: string[] = input.split("\n");
        let total = 0;
        games.find(game => {
            let possible = true;
            let idMatch = game.match(/\d+/);
            const gameId = idMatch != null ? idMatch[0] : "0";

            let rounds = game.substring(game.indexOf(":") + 2).split("; ");
            rounds.find(round => { // find instead of forEach to shortcircuit on first impossible round
                let draws = round.split(", ");
                let redCount = 0;
                let greenCount = 0;
                let blueCount = 0;
                draws.forEach(draw => {
                    const split = draw.split(" ");
                    let count = Number.parseInt(split[0])
                    switch (split[1]) {
                        case "red":
                            redCount += count;
                            return;
                        case "green":
                            greenCount += count;
                            return;
                        case "blue":
                            blueCount += count;
                            return;
                        default:
                            console.log("unknown colour " + split[1]);
                    }
                });
                if (redCount > redMax || greenCount > greenMax || blueCount > blueMax) {
                    possible = false;
                    return true;
                }
            });
            if (possible) {
                total += Number.parseInt(gameId);
            }
        })
        return "" + total;
    }

    solveForPartTwo(input: string): string {
        let games: string[] = input.split("\n");
        let total = 0;
        games.forEach(game => {
            let redMin = 0;
            let greenMin = 0;
            let blueMin = 0;

            let rounds = game.substring(game.indexOf(":") + 2).split("; ");
            rounds.forEach(round => {
                let draws = round.split(", ");
                draws.forEach(draw => {
                    const split = draw.split(" ");
                    let count = Number.parseInt(split[0])
                    switch (split[1]) {
                        case "red":
                            if (count > redMin) {
                                redMin = count;
                            }
                            return;
                        case "green":
                            if (count > greenMin) {
                                greenMin = count;
                            }
                            return;
                        case "blue":
                            if (count > blueMin) {
                                blueMin = count;
                            }
                            return;
                        default:
                            console.log("unknown colour " + split[1]);
                    }
                });

            });
            total += redMin * blueMin * greenMin;
        })
        return "" + total;
    }
}

export default new Day2;