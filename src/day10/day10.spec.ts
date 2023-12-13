import day10 from './index';

describe('On Day 10', () => {
    it(`part1 is identity function`, () => {
        expect(day10.solveForPartOne('-L|F7\n' +
            '7S-7|\n' +
            'L|7||\n' +
            '-L-J|\n' +
            'L|-JF')).toBe('4');
    })
    it(`part1 complex is identity function`, () => {
        expect(day10.solveForPartOne('7-F7-\n' +
            '.FJ|7\n' +
            'SJLL7\n' +
            '|F--J\n' +
            'LJ.LJ')).toBe('8');
    })
    it(`part2 is identity function`, () => {
        expect(day10.solveForPartTwo('...........\n' +
            '.S-------7.\n' +
            '.|F-----7|.\n' +
            '.||.....||.\n' +
            '.||.....||.\n' +
            '.|L-7.F-J|.\n' +
            '.|..|.|..|.\n' +
            '.L--J.L--J.\n' +
            '...........')).toBe('4');
    })
    it(`part2 complex is identity function`, () => {
        expect(day10.solveForPartTwo('.F----7F7F7F7F-7....\n' +
            '.|F--7||||||||FJ....\n' +
            '.||.FJ||||||||L7....\n' +
            'FJL7L7LJLJ||LJ.L-7..\n' +
            'L--J.L7...LJS7F-7L7.\n' +
            '....F-J..F7FJ|L7L7L7\n' +
            '....L7.F7||L7|.L7L7|\n' +
            '.....|FJLJ|FJ|F7|.LJ\n' +
            '....FJL-7.||.||||...\n' +
            '....L---J.LJ.LJLJ...')).toBe('8');
    })
});