import day3 from './index';

describe('On Day 3', () => {
    it(`part1 is identity function`, () => {
        expect(day3.solveForPartOne(
            '467..114..\n' +
            '...*......\n' +
            '..35..633.\n' +
            '......#...\n' +
            '617*......\n' +
            '.....+.58.\n' +
            '..592.....\n' +
            '......755.\n' +
            '...$.*....\n' +
            '.664.598..')).toBe('4361');
    })

    it(`part1 should handle multiple of same number on a line`, () => {
        expect(day3.solveForPartOne(
            '467..114..\n' +
            '...*......\n' +
            '..35..633.\n' +
            '......#...\n' +
            '617*......\n' +
            '.....+.58.\n' +
            '..592.....\n' +
            '......755.\n' +
            '...$.*....\n' +
            '.664.664..')).toBe('4427');
    })

    it(`part2 is identity function`, () => {
        expect(day3.solveForPartTwo(
            '467..114..\n' +
            '...*......\n' +
            '..35..633.\n' +
            '......#...\n' +
            '617*......\n' +
            '.....+.58.\n' +
            '..592.....\n' +
            '......755.\n' +
            '...$.*....\n' +
            '.664.598..')).toBe('467835');
    })
});