import {Day} from "../day";

class Day9 extends Day {

    constructor() {
        super(9);
    }

    solveForPartOne(input: string): string {
        let sequences: number[][] = input.split("\n").map(line => line.trim()).map(line => line.split(" ").map(numStr => Number.parseInt(numStr)));

        let nextNumbers = sequences.map(sequence => this.getNextNumber(sequence));

        return "" + nextNumbers.reduce((partialSum, a) => partialSum + a, 0)
    }

    solveForPartTwo(input: string): string {
        let sequences: number[][] = input.split("\n").map(line => line.trim()).map(line => line.split(" ").map(numStr => Number.parseInt(numStr)));

        let nextNumbers = sequences.map(sequence => sequence.reverse()).map(sequence => this.getNextNumber(sequence));

        return "" + nextNumbers.reduce((partialSum, a) => partialSum + a, 0)
    }

    getNextNumber(sequence: number[]): number {
        let differences: number[] = []
        for (let i = 0; i < sequence.length - 1; i++) {
            differences.push(sequence[i + 1] - sequence[i]);
        }
        if (differences.filter(diff => diff !== 0).length > 0) {
            return sequence[sequence.length - 1] + this.getNextNumber(differences);
        } else {
            return sequence[sequence.length - 1];
        }
    }
}

export default new Day9;