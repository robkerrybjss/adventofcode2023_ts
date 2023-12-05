import {Day} from "../day";

class Mapping {
    source: number;
    destination: number;
    range: number;

    constructor(source: number, destination: number, range: number) {
        this.source = source;
        this.destination = destination;
        this.range = range;
    }

    get(key: number): number | null {
        if (this.source <= key && key <= (this.source + this.range)) {
            return this.destination + (key - this.source);
        }
        return null;
    }

    reverse(key: number) {
        if (this.destination <= key && key <= (this.destination + this.range)) {
            return this.source + (key - this.destination);
        }
        return null;
    }
}

class SeedRange {
    start: number;
    range: number;


    constructor(start: number, range: number) {
        this.start = start;
        this.range = range;
    }
}

class Day5 extends Day {

    constructor() {
        super(5);
    }

    solveForPartOne(input: string): string {
        let seeds: number[] = [];
        let seedSoilMap: Mapping[] = [];
        let soilFertiliserMap: Mapping[] = [];
        let fertiliserWaterMap: Mapping[] = [];
        let waterLightMap: Mapping[] = [];
        let lightTemperatureMap: Mapping[] = [];
        let temperatureHumidityMap: Mapping[] = [];
        let humidityLocationMap: Mapping[] = [];

        this.parseInputPart1(input, seeds, seedSoilMap, soilFertiliserMap, fertiliserWaterMap, waterLightMap, lightTemperatureMap, temperatureHumidityMap, humidityLocationMap)

        let locations = seeds.map(seed => this.getValue(seed, seedSoilMap)).map(soil => this.getValue(soil, soilFertiliserMap))
            .map(fertiliser => this.getValue(fertiliser, fertiliserWaterMap)).map(water => this.getValue(water, waterLightMap))
            .map(light => this.getValue(light, lightTemperatureMap)).map(temperature => this.getValue(temperature, temperatureHumidityMap))
            .map(humidity => this.getValue(humidity, humidityLocationMap));

        return "" + Math.min(...locations);
    }

    solveForPartTwo(input: string): string {
        let seeds: SeedRange[] = [];
        let seedSoilMap: Mapping[] = [];
        let soilFertiliserMap: Mapping[] = [];
        let fertiliserWaterMap: Mapping[] = [];
        let waterLightMap: Mapping[] = [];
        let lightTemperatureMap: Mapping[] = [];
        let temperatureHumidityMap: Mapping[] = [];
        let humidityLocationMap: Mapping[] = [];

        this.parseInputPart2(input, seeds, seedSoilMap, soilFertiliserMap, fertiliserWaterMap, waterLightMap, lightTemperatureMap, temperatureHumidityMap, humidityLocationMap)

        let returnValue = null
        let location = 0;
        while (returnValue === null && location < Math.max(...seeds.map(seed => seed.start + seed.range))) {
            let humidity = this.getValueCanReverse(location, humidityLocationMap, true)
            let temperature = this.getValueCanReverse(humidity, temperatureHumidityMap, true)
            let light = this.getValueCanReverse(temperature, lightTemperatureMap, true)
            let water = this.getValueCanReverse(light, waterLightMap, true)
            let fertiliser = this.getValueCanReverse(water, fertiliserWaterMap, true)
            let soil = this.getValueCanReverse(fertiliser, soilFertiliserMap, true)
            let seed = this.getValueCanReverse(soil, seedSoilMap, true)
            seeds.forEach(seedRange => {
                if (seedRange.start <= seed && seed <= (seedRange.start + seedRange.range)) {
                    returnValue = location;
                }
            })
            location++
        }

        return "" + returnValue;
    }

    private parseInputPart1(input: string, seeds: number[], seedSoilMap: Mapping[], soilFertiliserMap: Mapping[], fertiliserWaterMap: Mapping[],
                            waterLightMap: Mapping[], lightTemperatureMap: Mapping[], temperatureHumidityMap: Mapping[], humidityLocationMap: Mapping[]) {
        let seedsLine = input.split("\n")[0];
        seedsLine = seedsLine.split(":")[1].trim();
        seedsLine.split(/\s+/).map(seedString => Number.parseInt(seedString)).forEach(seed => seeds.push(seed));
        this.parseInputCommon(input, seedSoilMap, soilFertiliserMap, fertiliserWaterMap, waterLightMap, lightTemperatureMap, temperatureHumidityMap, humidityLocationMap)

    }

    private parseInputPart2(input: string, seeds: SeedRange[], seedSoilMap: Mapping[], soilFertiliserMap: Mapping[], fertiliserWaterMap: Mapping[],
                            waterLightMap: Mapping[], lightTemperatureMap: Mapping[], temperatureHumidityMap: Mapping[], humidityLocationMap: Mapping[]) {
        let seedsLine = input.split("\n")[0];
        seedsLine = seedsLine.split(":")[1].trim();
        let seedItems = seedsLine.split(/\s+/);
        for (let i = 0; i < seedItems.length; i = i + 2) {
            seeds.push(new SeedRange(Number.parseInt(seedItems[i]), Number.parseInt(seedItems[i + 1])))
        }
        this.parseInputCommon(input, seedSoilMap, soilFertiliserMap, fertiliserWaterMap, waterLightMap, lightTemperatureMap, temperatureHumidityMap, humidityLocationMap)

    }


    private parseInputCommon(input: string, seedSoilMap: Mapping[], soilFertiliserMap: Mapping[], fertiliserWaterMap: Mapping[],
                             waterLightMap: Mapping[], lightTemperatureMap: Mapping[], temperatureHumidityMap: Mapping[], humidityLocationMap: Mapping[]) {
        this.parseMap(input, "seed-to-soil map:", "soil-to-fertilizer map:", seedSoilMap);
        this.parseMap(input, "soil-to-fertilizer map:", "fertilizer-to-water map:", soilFertiliserMap);
        this.parseMap(input, "fertilizer-to-water map:", "water-to-light map:", fertiliserWaterMap);
        this.parseMap(input, "water-to-light map:", "light-to-temperature map:", waterLightMap);
        this.parseMap(input, "light-to-temperature map:", "temperature-to-humidity map:", lightTemperatureMap);
        this.parseMap(input, "temperature-to-humidity map:", "humidity-to-location map:", temperatureHumidityMap);
        this.parseMap(input, "humidity-to-location map:", null, humidityLocationMap);

    }

    private parseMap(input: string, startHeading: string, endHeading: string | null, map: Mapping[]) {
        let mappingString = input.split("\n\n" + startHeading + "\n")[1];
        if (null !== endHeading) {
            mappingString = mappingString.split("\n\n" + endHeading + "\n")[0];
        }
        let mappings = mappingString.split("\n");
        mappings.forEach(mapping => {
            let items = mapping.trim().split(/\s+/).map(item => Number.parseInt(item));
            if (items.length !== 3) {
                console.error("Wrong map length");
            }
            map.push(new Mapping(items[1], items[0], items[2]));
        });
    }

    private getValue(input: number, mappingList: Mapping[]) {
        return this.getValueCanReverse(input, mappingList, false)
    }

    private getValueCanReverse(input: number, mappingList: Mapping[], reverse: boolean) {
        let returnValue = input;
        mappingList.forEach(mapping => {
            let retrievedValue = reverse ? mapping.reverse(input) : mapping.get(input)
            if (null !== retrievedValue) {
                returnValue = retrievedValue;
            }
        });
        return returnValue;
    }
}

export default new Day5;