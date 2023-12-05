import day5 from './index';

describe('On Day 5', () => {
    it(`part1 is identity function`, () => {
        expect(day5.solveForPartOne('seeds: 79 14 55 13\n' +
            '\n' +
            'seed-to-soil map:\n' +
            '50 98 2\n' +
            '52 50 48\n' +
            '\n' +
            'soil-to-fertilizer map:\n' +
            '0 15 37\n' +
            '37 52 2\n' +
            '39 0 15\n' +
            '\n' +
            'fertilizer-to-water map:\n' +
            '49 53 8\n' +
            '0 11 42\n' +
            '42 0 7\n' +
            '57 7 4\n' +
            '\n' +
            'water-to-light map:\n' +
            '88 18 7\n' +
            '18 25 70\n' +
            '\n' +
            'light-to-temperature map:\n' +
            '45 77 23\n' +
            '81 45 19\n' +
            '68 64 13\n' +
            '\n' +
            'temperature-to-humidity map:\n' +
            '0 69 1\n' +
            '1 0 69\n' +
            '\n' +
            'humidity-to-location map:\n' +
            '60 56 37\n' +
            '56 93 4')).toBe('35');
    })
    it(`part2 is identity function`, () => {
        expect(day5.solveForPartTwo('seeds: 79 14 55 13\n' +
            '\n' +
            'seed-to-soil map:\n' +
            '50 98 2\n' +
            '52 50 48\n' +
            '\n' +
            'soil-to-fertilizer map:\n' +
            '0 15 37\n' +
            '37 52 2\n' +
            '39 0 15\n' +
            '\n' +
            'fertilizer-to-water map:\n' +
            '49 53 8\n' +
            '0 11 42\n' +
            '42 0 7\n' +
            '57 7 4\n' +
            '\n' +
            'water-to-light map:\n' +
            '88 18 7\n' +
            '18 25 70\n' +
            '\n' +
            'light-to-temperature map:\n' +
            '45 77 23\n' +
            '81 45 19\n' +
            '68 64 13\n' +
            '\n' +
            'temperature-to-humidity map:\n' +
            '0 69 1\n' +
            '1 0 69\n' +
            '\n' +
            'humidity-to-location map:\n' +
            '60 56 37\n' +
            '56 93 4')).toBe('46');
    })
});