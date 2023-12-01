import {Day} from "../day";

function reverseString(input: string) {
    let charArray: Array<string> = input.split("");
    charArray.reverse();
    return charArray.join("");
}

function convertMatchToNumber(match: RegExpMatchArray | null, reverse: boolean) {
    if (match != null) {
        let matchedString = match[0];
        if (reverse) {
            matchedString = reverseString(matchedString);
        }
        switch (matchedString) {
            case "one":
                return 1;
            case "two":
                return 2;
            case "three":
                return 3;
            case "four":
                return 4;
            case "five":
                return 5;
            case "six":
                return 6;
            case "seven":
                return 7;
            case "eight":
                return 8;
            case "nine":
                return 9;
            default:
                return Number.parseInt(matchedString);
        }
    }
}

class Day1 extends Day {

    constructor() {
        super(1);
    }

    solveForPartOne(input: string): string {
        let lines: string[] = input.split("\n");
        let numbers: number[] = new Array<number>();
        lines.forEach(line => {
            let firstDigit = line.match(/\d/);

            let reversed: string = reverseString(line);

            let secondDigit = reversed.match(/\d/);
            if (null != firstDigit && null != secondDigit) {
                numbers.push(Number.parseInt(firstDigit[0] + secondDigit[0]));
            }
        });
        return "" + numbers.reduce((partialSum, a) => partialSum + a, 0);
    }

    solveForPartTwo(input: string): string {
        let lines: string[] = input.split("\n");
        let numbers: number[] = new Array<number>();
        lines.forEach(line => {
            let firstDigitMatch = line.match(/\d|one|two|three|four|five|six|seven|eight|nine/);
            let firstDigit = convertMatchToNumber(firstDigitMatch, false);

            let charArray: Array<string> = line.split("");
            charArray.reverse();
            let reversed: string = charArray.join("");

            let secondDigitMatch = reversed.match(/\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/);
            let secondDigit = convertMatchToNumber(secondDigitMatch, true);
            numbers.push(Number.parseInt("" + firstDigit + secondDigit));
        });
        return "" + numbers.reduce((partialSum, a) => partialSum + a, 0);
    }
}

export default new Day1;