// Copyright (c) 2019 Dr. Matthias Hölzl.

import GridLocation from "./GridLocation";
import GridLevel from "./GridLevel";
import World from "../core/World";

describe("GridLocation", () => {
    const [unitW, unitH] = [1, 2];
    let world: World = new World();
    let level: GridLevel = new GridLevel(world, 4, 3);
    let unit: GridLocation;
    beforeEach(() => {
        unit = new GridLocation(level, unitW, unitH);
    });
    it("stores the data passed to the constructor", () => {
        expect(unit.level).toEqual(level);
        expect(unit.w).toEqual(unitW);
        expect(unit.h).toEqual(unitH);
    });
});