// Copyright (c) 2019 Dr. Matthias Hölzl.

import Location from "./Location";
import World from "./World";
import Level from "./Level";
import Direction from "./Direction";

export interface GameCharacterConstructor {
    new(name: string, initialLocation: Location): GameCharacter;
}

interface GameCharacter {
    readonly name: String;
    readonly world: World;
    readonly level: Level;
    readonly location: Location;
    readonly isAlive: boolean;

    move(direction: Direction): void;

    die(): void;
}

export default GameCharacter;