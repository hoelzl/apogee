// Copyright (c) 2019 Dr. Matthias Hölzl.

import Direction from "./Direction";
import World from "./World";
import Level from "./Level";

interface Location {
    readonly world: World;
    readonly level: Level;

    getNeighbor(d: Direction): Location;
}

export default Location;