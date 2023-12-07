import {Day} from "../day";

class Day7 extends Day {

    constructor() {
        super(7);
    }

    solveForPartOne(input: string): string {
        let hands: Hand[] = this.parseInput(input, false);
        return this.calculateTotalWinnings(hands);
    }

    solveForPartTwo(input: string): string {
        let hands: Hand[] = this.parseInput(input, true);
        return this.calculateTotalWinnings(hands);
    }

    parseInput(input: string, wildcard: boolean): Hand[] {
        let hands: Hand[] = [];
        input.split("\n").forEach(line => {
            let cardStrings = line.split(" ")[0].split("");
            hands.push(new Hand(cardStrings, Number.parseInt(line.split(" ")[1]), wildcard));
        });
        return hands;
    }

    calculateTotalWinnings(hands: Hand[]): string {
        hands.sort((a, b) => {
            if (a.type !== b.type) {
                return b.type - a.type;
            }
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] !== b.cards[i]) {
                    return b.cards[i] - a.cards[i];
                }
            }
            return 0;
        });

        hands = hands.reverse();

        let scores: number[] = [];

        hands.forEach((hand, i) => {
            scores.push(hand.bid * (i + 1));
        })

        return "" + scores.reduce((partialSum, a) => partialSum + a, 0);

    }
}

class Hand {
    cards: number[];
    bid: number;
    type: TypeOfHand;

    constructor(cardStrings: string[], bid: number, wildcard: boolean) {
        this.bid = bid;

        if (cardStrings.length !== 5) {
            console.error("invalid hand size");
        }

        let cards: number[] = [];
        cardStrings.forEach(cardString => {
            if (null !== cardString.match(/\d+/)) {
                cards.push(Number.parseInt(cardString))
            } else {
                switch (cardString) {
                    case "T":
                        cards.push(10);
                        break;
                    case "J":
                        cards.push(wildcard ? 1 : 11);
                        break;
                    case "Q":
                        cards.push(12);
                        break;
                    case "K":
                        cards.push(13);
                        break;
                    case "A":
                        cards.push(14);
                        break;
                }
            }
        })
        this.cards = cards;

        const counts: Map<number, number> = new Map();
        cards.forEach((x) => {
            counts.set(x, (counts.get(x) || 0) + 1)
        });

        let wildcardCount = counts.get(1) || 0;
        counts.delete(1);

        if (wildcardCount === 5) {
            this.type = TypeOfHand.FiveOfAKind;
            return;
        }

        let reduce = [...counts.entries()].reduce((a, e ) => e[1] > a[1] ? e : a);
        counts.set(reduce[0], (counts.get(reduce[0]) || 0) + wildcardCount)

        if (counts.size === 1) { // all cards the same
            this.type = TypeOfHand.FiveOfAKind;
        } else if (counts.size === 2 && [...counts.values()].includes(4)) { // 4 of one card
            this.type = TypeOfHand.FourOfAKind;
        } else if (counts.size === 2 && [...counts.values()].includes(3)) { // 3 of one card and thus 3 of another
            this.type = TypeOfHand.FullHouse;
        } else if ([...counts.values()].includes(3)) { // three of one card
            this.type = TypeOfHand.ThreeOfAKind;
        } else if (counts.size === 3) { // two pairs and a single
            this.type = TypeOfHand.TwoPair
        } else if ([...counts.values()].includes(2)) { // a pair
            this.type = TypeOfHand.OnePair
        } else {
            this.type = TypeOfHand.HighCard
        }

    }
}

enum TypeOfHand {
    HighCard,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}

export default new Day7;