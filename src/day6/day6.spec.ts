import day6 from './index';

describe('On Day 6', () => {
    it(`part1 is identity function`, () => {
        expect(day6.solveForPartOne('Time:      7  15   30\n' +
            'Distance:  9  40  200')).toBe('288');
    })
    it(`part2 is identity function`, () => {
        expect(day6.solveForPartTwo('Time:      7  15   30\n' +
            'Distance:  9  40  200')).toBe('71503');
    })
});