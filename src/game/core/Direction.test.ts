// Copyright (c) 2019 Dr. Matthias Hölzl.

import Direction, {
    allDirections,
    diagonalDirections,
    gridDirections,
    horizontalDirections,
    reverseDirection
} from "./Direction";

describe("Direction", () => {
    it("has 10 possible values", () => {
        expect(allDirections.size).toBe(10);
    });
    it("has 4 grid directions", () => {
        expect(gridDirections.size).toBe(4);
        expect(gridDirections)
            .toEqual(new Set([Direction.North, Direction.East, Direction.South, Direction.West]));
    });
    it("has 4 diagonal directions", () => {
        expect(diagonalDirections.size).toBe(4);
        expect(diagonalDirections)
            .toEqual(new Set([Direction.NorthEast,
                Direction.NorthWest,
                Direction.SouthEast,
                Direction.SouthWest]));
    });
    it("has 2 horizontal directions", () => {
        expect(horizontalDirections.size).toBe(2);
        expect(horizontalDirections).toEqual(new Set([Direction.Up, Direction.Down]));
    });
});

describe("Direction.reverseDirection()", () => {
    it("returns a direction different from its input", () => {
        allDirections.forEach(d => {
            expect(reverseDirection(d)).not.toBe(d);
        });
    });
    it("is self-inverse", () => {
        allDirections.forEach(d => {
            expect(reverseDirection(reverseDirection(d))).toBe(d);
        });
    });
});

describe.each([[Direction.North, Direction.South],
    [Direction.East, Direction.West],
    [Direction.NorthEast, Direction.SouthWest],
    [Direction.NorthWest, Direction.SouthEast]])("Direction.reverseDirection()",
    (d, expected) => {
        it(`${d} returns ${expected}`, () => {
            expect(reverseDirection(d)).toBe(expected);
        });
    });
