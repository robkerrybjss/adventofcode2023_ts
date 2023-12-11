import {Day} from "../day";

class Day11 extends Day {

    constructor() {
        super(11);
    }

    solveForPartOne(input: string): string {
        const galaxies = this.parseInputToGalaxies(input, 1);
        let distances = galaxies.flatMap(
            (galaxyStart, i) => galaxies.slice(i+1).map( galaxyEnd => Math.abs(galaxyEnd.x - galaxyStart.x) +  Math.abs(galaxyEnd.y - galaxyStart.y) ))

        console.log(distances)

        return "" + [...distances].reduce((partialSum, a) => partialSum + a, 0);
    }

    solveForPartTwo(input: string): string {
        const galaxies = this.parseInputToGalaxies(input, 999999);
        let distances = galaxies.flatMap(
            (galaxyStart, i) => galaxies.slice(i+1).map( galaxyEnd => Math.abs(galaxyEnd.x - galaxyStart.x) +  Math.abs(galaxyEnd.y - galaxyStart.y) ))

        console.log(distances)

        return "" + [...distances].reduce((partialSum, a) => partialSum + a, 0);
    }

    private parseInputToGalaxies(input: string, growthFactor: number) {
        let rows: string[][] = [];
        input.split("\n").forEach(row => {
            rows.push(row.split(""))
            if (new Set(row.split("")).size === 1) {
                for (let i = 0; i < growthFactor; i++) {
                    rows.push(row.split(""))
                }
            }
        })
        let transposedRows = this.transposeArray(rows);
        let cols: string[][] = [];
        transposedRows.forEach(row => {
            cols.push(row)
            if (new Set(row).size === 1) {
                for (let i = 0; i < growthFactor; i++) {
                    cols.push(row)
                }
            }
        })
        let galaxies: Position[] = [];
        cols.forEach((col, xIndex) => {
            col.forEach((item, yIndex) => {
                if (item === '#') {
                    galaxies.push(new Position(xIndex, yIndex));
                }
            })
        })
        return galaxies;
    }

    private transposeArray(array: string[][]): string[][] {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < i; j++) {
                [array[i][j], array[j][i]] = [array[j][i], array[i][j]];
            }
        }
        return array;
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