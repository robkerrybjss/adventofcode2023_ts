import {Day} from "../day";

class Day11 extends Day {

    constructor() {
        super(11);
    }

    solveForPartOne(input: string): string {
        const galaxies = this.parseInputToGalaxies(input, 1);
        let distances = galaxies.flatMap(
            (galaxyStart, i) => galaxies.slice(i+1).map( galaxyEnd => Math.abs(galaxyEnd.x - galaxyStart.x) +  Math.abs(galaxyEnd.y - galaxyStart.y) ))

        return "" + [...distances].reduce((partialSum, a) => partialSum + a, 0);
    }

    solveForPartTwo(input: string): string {
        const galaxies = this.parseInputToGalaxies(input, 999999);
        let sum = 0;
        galaxies.flatMap(
            (galaxyStart, i) => galaxies.slice(i+1).map( galaxyEnd => sum += (Math.abs(galaxyEnd.x - galaxyStart.x) +  Math.abs(galaxyEnd.y - galaxyStart.y) )))

        return "" + sum;
    }

    private parseInputToGalaxies(input: string, growthFactor: number) {

        const expandingRows = input.split("\n")
            .map((v, i) => [v, i])
            .filter(([v, i]) => !(v as string).includes("#"))
            .map(([v, i]) => i as number);
        const inputLengthArray = Array.from(Array(input.split("\n").length).keys());
        const expandingCols = Array.from(Array(input.split("\n")[0].length).keys()).filter((i) =>
            inputLengthArray.every((j) => input.split("\n")[j][i] == ".")
        );
        let galaxies: Position[] = [];
        input.split("\n").forEach((col, xIndex) => {
            col.split("").forEach((item, yIndex) => {
                if (item === '#') {
                    galaxies.push(new Position(xIndex + (expandingRows.filter((row) => row < xIndex).length * growthFactor),
                        yIndex+ (expandingCols.filter((col) => col < yIndex).length * growthFactor)));
                }
            })
        })
        return galaxies;
    }
}

class Position {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export default new Day11;