import day11 from './index';

describe('On Day 11', () => {
    it(`part1 is identity function`, () => {
        expect(day11.solveForPartOne('...#......\n' +
            '.......#..\n' +
            '#.........\n' +
            '..........\n' +
            '......#...\n' +
            '.#........\n' +
            '.........#\n' +
            '..........\n' +
            '.......#..\n' +
            '#...#.....')).toBe('374');
    })
});