import {Day} from "../day";

class Day10 extends Day {

    constructor() {
        super(10);
    }

    solveForPartOne(input: string): string {
        let grid: string[][] = input.split("\n").map(line => line.split(""));

        let start = this.findStart(grid);
        let x = start.x;
        let y = start.y;
        console.log(`starting at ${x}, ${y}`)
        let dir: string = '';

        let below = grid[y + 1][x];
        if (below === '|' || below === 'L' || below === 'J') {
            dir = 'S';
            y++;
        }
        if (!dir) {
            let above = grid[y - 1][x];
            if (above === '|' || above === 'F' || above === '7') {
                dir = 'N';
                y--;
            }
        }
        if (!dir) {
            //only possible starting shape left is -, pick E or W arbitrarily
            dir = 'E'
            x++;
        }
        let path = [start, {x, y}];
        let steps = 1;
        while (x !== start.x || y !== start.y) {
            let deltaX = 0;
            let deltaY = 0;
            switch (grid[y][x] + dir) {
                case '|S':
                    deltaY = 1;
                    break;
                case '|N':
                    deltaY = -1;
                    break;
                case '-E':
                    deltaX = 1;
                    break;
                case '-W':
                    deltaX = -1;
                    break;
                case 'LS':
                    deltaX = 1;
                    break;
                case 'LW':
                    deltaY = -1;
                    break;
                case 'JS':
                    deltaX = -1;
                    break;
                case 'JE':
                    deltaY = -1;
                    break;
                case '7N':
                    deltaX = -1;
                    break;
                case '7E':
                    deltaY = 1;
                    break;
                case 'FN':
                    deltaX = 1;
                    break;
                case 'FW':
                    deltaY = 1;
                    break;
                default:
                    throw 'unrecognized ' + grid[y][x] + dir;
            }
            if (deltaY === 1) {
                dir = 'S';
            } else if (deltaY === -1) {
                dir = 'N';
            } else if (deltaX === -1) {
                dir = 'W';
            } else {
                dir = 'E';
            }
            x += deltaX;
            y += deltaY;
            steps++;
            path.push({x, y});
        }

        return "" + (steps / 2);
    }

    solveForPartTwo(input: string): string {
        let grid: string[][] = input.split("\n").map(line => line.split(""));
        let newGrid: string[][] = new Array(grid.length).fill(new Array(grid[0].length).fill("."));

        let start = this.findStart(grid);
        let x = start.x;
        let y = start.y;
        console.log(`starting at ${x}, ${y}`)
        let dir: string = '';
        newGrid[y][x] = "X";

        let below = grid[y + 1][x];
        if (below === '|' || below === 'L' || below === 'J') {
            dir = 'S';
            y++;
        }
        if (!dir) {
            let above = grid[y - 1][x];
            if (above === '|' || above === 'F' || above === '7') {
                dir = 'N';
                y--;
            }
        }
        if (!dir) {
            //only possible starting shape left is -, pick E or W arbitrarily
            dir = 'E'
            x++;
        }

        newGrid = newGrid.splice(y,1, newGrid[y].splice(x,1,'X'));
        let path = [start, {x, y}];
        let steps = 1;
        while (x !== start.x || y !== start.y) {
            let deltaX = 0;
            let deltaY = 0;
            switch (grid[y][x] + dir) {
                case '|S':
                    deltaY = 1;
                    break;
                case '|N':
                    deltaY = -1;
                    break;
                case '-E':
                    deltaX = 1;
                    break;
                case '-W':
                    deltaX = -1;
                    break;
                case 'LS':
                    deltaX = 1;
                    break;
                case 'LW':
                    deltaY = -1;
                    break;
                case 'JS':
                    deltaX = -1;
                    break;
                case 'JE':
                    deltaY = -1;
                    break;
                case '7N':
                    deltaX = -1;
                    break;
                case '7E':
                    deltaY = 1;
                    break;
                case 'FN':
                    deltaX = 1;
                    break;
                case 'FW':
                    deltaY = 1;
                    break;
                default:
                    throw 'unrecognized ' + grid[y][x] + dir;
            }
            if (deltaY === 1) {
                dir = 'S';
            } else if (deltaY === -1) {
                dir = 'N';
            } else if (deltaX === -1) {
                dir = 'W';
            } else {
                dir = 'E';
            }
            x += deltaX;
            y += deltaY;
            steps++;
            path.push({x, y});
            newGrid = newGrid.splice(y,1, newGrid[y].splice(x,1,'X'));
        }

        console.log(newGrid)

        return "" + (steps / 2);
    }

    private findStart(grid: string[][]): { x: number, y: number } {
        let start = {x: 0, y: 0}
        grid.forEach((line, yIndex) => {
            line.forEach((char, xIndex) => {
                if (char === "S") {
                    console.log(`Found S at ${xIndex}, ${yIndex}`)
                    start.x = xIndex
                    start.y = yIndex
                }
            })
        })
        return start;
    }
}

export default new Day10;