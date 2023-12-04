import {Day} from "../day";

class Card {
    winningNumbers:Set<number>;
    playedNumbers:Set<number>;
    count: number;

    constructor() {
        this.winningNumbers = new Set<number>();
        this.playedNumbers = new Set<number>();
        this.count = 1;
    }
}

function parseInput(input: string) {
    return input.split("\n").map(line => {
        line = line.split(":")[1]; // Strip label off
        let winningNumbersString = line.split(" | ")[0].trim();
        let playedNumbersString = line.split(" | ")[1].trim();
        let card = new Card();
        winningNumbersString.split(/\s+/).map(number => Number.parseInt(number)).forEach(value => card.winningNumbers.add(value))
        playedNumbersString.split(/\s+/).map(number => Number.parseInt(number)).forEach(value => card.playedNumbers.add(value))
        return card;
    });
}

class Day4 extends Day {

    constructor() {
        super(4);
    }

    solveForPartOne(input: string): string {
        const cards: Card[] = parseInput(input);
        let score = 0;
        cards.forEach(card => {
            let winners = new Set([...card.playedNumbers].filter(x => card.winningNumbers.has(x)));
            if (winners.size > 0) {
                score += 2 ** (winners.size - 1);
            }
        })
        return "" + score;
    }

    solveForPartTwo(input: string): string {
        const cards: Card[] = parseInput(input);
        cards.forEach((card, index) => {
            let winners = new Set([...card.playedNumbers].filter(x => card.winningNumbers.has(x)));
            for (let i = 1; i <= winners.size; i++) {
                if ((index + i) < cards.length) {
                    for (let j = 0; j < card.count; j++) {
                        cards[index + i].count++;
                    }
                }
            }
        });
        return "" + cards.map(card => card.count).reduce((partialSum, a) => partialSum + a, 0);
    }
}

export default new Day4;