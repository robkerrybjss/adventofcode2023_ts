import day8 from './index';

describe('On Day 8', () => {
    it(`part1 is identity function`, () => {
        expect(day8.solveForPartOne('RL\n' +
            '\n' +
            'AAA = (BBB, CCC)\n' +
            'BBB = (DDD, EEE)\n' +
            'CCC = (ZZZ, GGG)\n' +
            'DDD = (DDD, DDD)\n' +
            'EEE = (EEE, EEE)\n' +
            'GGG = (GGG, GGG)\n' +
            'ZZZ = (ZZZ, ZZZ)')).toBe('2');
    });
    it(`part1 is identity function again`, () => {
        expect(day8.solveForPartOne('LLR\n' +
            '\n' +
            'AAA = (BBB, BBB)\n' +
            'BBB = (AAA, ZZZ)\n' +
            'ZZZ = (ZZZ, ZZZ)')).toBe('6');
    });
    it(`part2 is identity function again`, () => {
        expect(day8.solveForPartTwo('LR\n' +
            '\n' +
            '11A = (11B, XXX)\n' +
            '11B = (XXX, 11Z)\n' +
            '11Z = (11B, XXX)\n' +
            '22A = (22B, XXX)\n' +
            '22B = (22C, 22C)\n' +
            '22C = (22Z, 22Z)\n' +
            '22Z = (22B, 22B)\n' +
            'XXX = (XXX, XXX)')).toBe('6');
    });
});