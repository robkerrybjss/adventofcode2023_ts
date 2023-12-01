import day1 from './index';

describe('On Day 1', () => {

    it(`part1 should solve`, () => {
        const testInputPart1 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
        expect(day1.solveForPartOne(testInputPart1)).toBe("142");
    })

    it(`part2 should solve`, () => {
        const testInputPart2 = "two1nine\n" +
            "eightwothree\n" +
            "abcone2threexyz\n" +
            "xtwone3four\n" +
            "4nineeightseven2\n" +
            "zoneight234\n" +
            "7pqrstsixteen";
        expect(day1.solveForPartTwo(testInputPart2)).toBe("281");
    })

});
