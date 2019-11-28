// Copyright (c) 2019 Dr. Matthias Hölzl.

import GameCharacter from "../core/GameCharacter";
import World from "../core/World";
import Location from "../core/Location";
import Level from "../core/Level";
import Direction from "../core/Direction";

class Character implements GameCharacter {
    readonly name: String;

    constructor(name: String, location: Location) {
        this.name = name;
        this._location = location;
        this.world.noteCharacterCreated(this);
    }

    private _location: Location;

    get location(): Location {
        return this._location;
    }

    private _isAlive: boolean = true;

    get isAlive(): boolean {
        return this._isAlive;
    }

    get world(): World {
        return this._location.world;
    };

    get level(): Level {
        return this._location.level;
    };

    die(): void {
        this._isAlive = false;
        this.world.noteCharacterDied(this);
    }

    move(direction: Direction): void {
        this._location = this._location.getNeighbor(direction);
        this.world.noteCharacterMoved(this, this._location);
    }
}

export default Character;