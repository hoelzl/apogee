// Copyright (c) 2019 Dr. Matthias Hölzl.

import Level from "../core/Level";
import World from "../core/World";
import {assert, precondition} from "../core/Utils";
import GridLocation from "./GridLocation";

class GridLevel implements Level {
    readonly world: World;
    readonly width: number;
    readonly height: number;
    readonly board: Array<GridLocation> = [];

    constructor(world: World, width: number, height: number) {
        this.world = world;
        this.width = width;
        this.height = height;

        this.initializeBoard();
    }

    getLocation(w: number, h: number) {
        let location = this.getLocationUnchecked(w, h);
        assert(location.w === w, "Location has wrong w-index.");
        assert(location.h === h, "Location has wrong h-index.");
        return location;
    }

    getLocationUnchecked(w: number, h: number) {
        precondition(w < this.width, "Location outside level (width).");
        precondition(h < this.height, "Location outside level (height).");
        return this.board[w * this.height + h];
    }

    private initializeBoard() {
        for (let w = 0; w < this.width; ++w) {
            for (let h = 0; h < this.height; ++h) {
                const location = new GridLocation(this, w, h);
                this.board.push(location);
            }
        }
        // Needs to happen after all cells of the board are initialized.
        this.board.forEach(location => location.computeNeighbors());
    }
}

export default GridLevel;