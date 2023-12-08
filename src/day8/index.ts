import {Day} from "../day";

class Day8 extends Day {

    constructor() {
        super(8);
    }

    solveForPartOne(input: string): string {
        let directionOrder = this.parseDirectionOrder(input);
        let directionsMap = this.parseInputDirections(input.split("\n"));

        let currentLocation = "AAA";
        let count = 0;
        while (currentLocation !== "ZZZ") {
            directionOrder.forEach(direction => {
                let currentLocationDirection = directionsMap.get(currentLocation);

                if (currentLocationDirection !== undefined) {
                    if (direction === 'L') {
                        // @ts-ignore
                        currentLocation = currentLocationDirection.left
                    } else {
                        // @ts-ignore
                        currentLocation = currentLocationDirection.right
                    }
                }
                count++;
            })
        }

        return "" + count;
    }

    solveForPartTwo(input: string): string {
        let directionOrder = this.parseDirectionOrder(input);
        let directionsMap = this.parseInputDirections(input.split("\n"));

        let initialKeys = [...directionsMap.keys()].filter(key => key.endsWith("A"));

        let counts: number[] = [];

        initialKeys.forEach((startLocation) => {
            let currentLocation = startLocation;
            let count = 0;
            while (!currentLocation.endsWith("Z")) {
                directionOrder.forEach(direction => {
                    let currentLocationDirection = directionsMap.get(currentLocation);

                    if (currentLocationDirection !== undefined) {
                        if (direction === 'L') {
                            // @ts-ignore
                            currentLocation = currentLocationDirection.left
                        } else {
                            // @ts-ignore
                            currentLocation = currentLocationDirection.right
                        }
                    }
                    count++;
                })
            }
            counts.push(count)
        });

        console.log(counts);

        return "" + this.lowestCommonMultiple(counts);
    }

    parseDirectionOrder(input: string) {
        return input.split("\n")[0].trim().split("");
    }

    parseInputDirections(input: string[]): Map<string, Direction> {
        let directions: Map<string, Direction> = new Map();

        input.forEach((line, index) => {
            if (index > 1) {
                let key = line.substring(0, 3);
                let left = line.substring(7, 10);
                let right = line.substring(12, 15);
                directions.set(key, new Direction(left, right));
            }
        })

        return directions;
    }

    lowestCommonMultiple(arr: number[]) {
        const _lcm = (x: number, y: number) => (x * y) / this.gcd(x, y);
        return [...arr].reduce((a, b) => _lcm(a, b));
    };

    gcd(x: number, y: number): number {
        return (!y ? x : this.gcd(y, x % y))
    }
}

class Direction {
    left: string;
    right: string;

    constructor(left: string, right: string) {
        this.left = left;
        this.right = right;
    }
}

export default new Day8;