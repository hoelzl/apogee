// Copyright (c) 2019 Dr. Matthias Hölzl.

import Location from "../core/Location";
import Direction from "../core/Direction";
import World from "../core/World";
import GridLevel from "./GridLevel";
import {assert} from "../core/Utils";

class GridLocation implements Location {
    readonly level: GridLevel;
    readonly w: number;
    readonly h: number;
    private neighbors: Map<Direction, Location> = new Map<Direction, Location>();

    constructor(level: GridLevel, w: number, h: number) {
        this.level = level;
        this.w = w;
        this.h = h;
    }

    get world(): World {
        return this.level.world;
    }

    getNeighbor(d: Direction): Location {
        return this.neighbors.get(d) || this;
    }

    computeNeighbors(): void {
        const get = (w: number, h: number) => this.level.getLocationUnchecked(w, h);
        assert(get(this.w, this.h) === this,
            `Board location at ${this.w}, ${this.h} is inconsistent with current location`);
        if (this.w > 0) {
            this.neighbors.set(Direction.West, get(this.w - 1, this.h));
        }
        if (this.w < this.level.width - 1) {
            this.neighbors.set(Direction.East, get(this.w + 1, this.h));
        }
        if (this.h > 0) {
            this.neighbors.set(Direction.South, get(this.w, this.h - 1));
        }
        if (this.h < this.level.height - 1) {
            this.neighbors.set(Direction.North, get(this.w, this.h + 1));
        }
    }
}

export default GridLocation;
