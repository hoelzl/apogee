// Copyright (c) 2019 Dr. Matthias Hölzl.

import GridLocation from "./GridLocation";
import GridLevel from "./GridLevel";
import World from "../core/World";
import Direction, {
    allDirections,
    diagonalDirections,
    gridDirections,
    horizontalDirections,
    reverseDirection
} from "../core/Direction";

function forEachLocation(ds: Set<Direction>, unit: GridLevel,
                         test: (d: Direction, w: number, h: number, l: GridLocation) => void) {
    for (let d of Array.from(ds)) {
        for (let w = 0; w < unit.width; ++w) {
            for (let h = 0; h < unit.height; ++h) {
                const location = unit.getLocation(w, h);
                test(d, w, h, location);
            }
        }
    }
}

describe("GridLocation", () => {
    let world: World = new World();
    let unit: GridLevel;
    beforeEach(() => {
        unit = new GridLevel(world, 4, 3);
    });

    it("stores the data passed to the constructor", () => {
        expect(unit.world).toEqual(world);
        expect(unit.width).toEqual(4);
        expect(unit.height).toEqual(3);
    });

    it("has correctly labeled cells", () => {
        forEachLocation(allDirections, unit, (d, w, h, location) => {
            expect(location.w).toEqual(w);
            expect(location.h).toEqual(h);
        });
    });

    it("has no diagonal transitions", () => {
        forEachLocation(diagonalDirections, unit, (d, w, h, location) => {
            expect(location.getNeighbor(d)).toEqual(location);
        });
    });

    it("has no horizontal transitions", () => {
        forEachLocation(horizontalDirections, unit, (d, w, h, location) => {
            expect(location.getNeighbor(d)).toEqual(location);
        });
    });

    it("has correct grid transitions", () => {
        forEachLocation(gridDirections, unit, (d, w, h, location) => {
            const neighbor = location.getNeighbor(d);
            if ((w === 0 && d === Direction.West) ||
                (w === unit.width - 1 && d === Direction.East) ||
                (h === 0 && d === Direction.South) ||
                (h === unit.height - 1 && d === Direction.North)) {
                expect(neighbor).toEqual(location);
            } else {
                expect(neighbor).not.toEqual(location);
                expect(neighbor.getNeighbor(reverseDirection(d))).toEqual(location);
            }
        });
    });
});