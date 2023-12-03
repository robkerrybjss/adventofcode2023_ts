import {Day} from "../day";

class PartNumberItem {
    partNumber: number;
    startIndex: number;
    endIndex: number;
    rowNumber: number;

    constructor(partNumber: number, startIndex: number, endIndex: number, rowNumber: number) {
        this.partNumber = partNumber;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.rowNumber = rowNumber;
    }
}

class SymbolItem {
    index: number;
    rowNumber: number;
    gearRatio: number = 0;
    symbol: string;

    constructor(index: number, rowNumber: number, symbol: string) {
        this.index = index;
        this.rowNumber = rowNumber;
        this.symbol = symbol;
    }
}

class Day3 extends Day {

    constructor() {
        super(3);
    }

    parseInput(input: string, partNumbers: PartNumberItem[], symbols: SymbolItem[]) {

        const lines = input.split("\n");
        lines.forEach((line, index) => {
            let numberMatches = line.match(/\d+/g);
            if (null != numberMatches) {
                numberMatches.forEach(match => {
                    let startIndex = line.indexOf(match);

                    let partNumber = new PartNumberItem(Number.parseInt(match),
                        startIndex,
                        startIndex + match.length - 1,
                        index);
                    partNumbers.push(partNumber);

                    line = line.replace(match, new Array(match.length + 1).join('X'));
                });
            }

            let symbolMatches = line.match(/[^. 0-9X]/g);
            if (null != symbolMatches) {
                symbolMatches.forEach(match => {
                    symbols.push(new SymbolItem(line.indexOf(match), index, match));

                    line = line.replace(match, new Array(match.length + 1).join('X'));
                })
            }
        });
    }

    partAndSymbolAdjacent(partNumber: PartNumberItem, symbol: SymbolItem) {
        return (symbol.rowNumber === partNumber.rowNumber + 1 || symbol.rowNumber === partNumber.rowNumber || (partNumber.rowNumber > 0 && symbol.rowNumber === partNumber.rowNumber - 1)) // within 1 row of number
            && (partNumber.startIndex - 1 <= symbol.index && symbol.index <= partNumber.endIndex + 1); // within 1 column of number
    }

    solveForPartOne(input: string): string {

        // Parse numbers and Symbols from list
        let partNumbers: PartNumberItem[] = [];
        let symbols: SymbolItem[] = [];
        this.parseInput(input, partNumbers, symbols);

        // find numbers near a Symbol
        let acceptedParts = partNumbers.filter(partNumber => {
            let filteredSymbols = symbols.filter(symbol => {
                return this.partAndSymbolAdjacent(partNumber, symbol)
            });

            return filteredSymbols.length > 0;
        })

        // Sum
        let sum = acceptedParts.map(acceptedParts => acceptedParts.partNumber).reduce((partialSum, a) => partialSum + a, 0);

        return "" + sum;
    }

    solveForPartTwo(input: string): string {

        // Parse numbers and Symbols from list
        let partNumbers: PartNumberItem[] = [];
        let symbols: SymbolItem[] = [];
        this.parseInput(input, partNumbers, symbols);

        // find symbols with 2 numbers adjacent and set gear ratio
        let acceptedGears = symbols
            .filter(symbol => symbol.symbol === '*')
            .filter(symbol => {
                let filteredParts = partNumbers.filter(partNumber => {
                    return this.partAndSymbolAdjacent(partNumber, symbol)
                });
                if (filteredParts.length === 2) {
                    symbol.gearRatio = filteredParts[0].partNumber * filteredParts[1].partNumber;
                    return true;
                }
            });


        // Sum gear ratios
        let sum = acceptedGears.map(acceptedParts => acceptedParts.gearRatio).reduce((partialSum, a) => partialSum + a, 0);

        return "" + sum;
    }
}

export default new Day3;