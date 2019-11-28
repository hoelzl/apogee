// Copyright (c) 2019 Dr. Matthias Hölzl.

import Level from "../Level";
import Location from "../Location";
import World from "../World";
import Direction, {allDirections, reverseDirection} from "../Direction";
import CharacterObserver from "../CharacterObserver";
import GameCharacter from "../GameCharacter";

export class CharacterObserverSpy implements CharacterObserver {
    characterCreatedCount = 0;
    characterDiedCount = 0;
    characterMovedCount = 0;

    onCharacterCreated(character: GameCharacter): void {
        this.characterCreatedCount++;
    }

    onCharacterDied(character: GameCharacter): void {
        this.characterDiedCount++;
    }

    onCharacterMoved(character: GameCharacter, location: Location): void {
        this.characterMovedCount++;
    }

}

export class TestLevel implements Level {
    readonly world: World;

    constructor(world: World) {
        this.world = world;
    }
}

export class TestLocation implements Location {
    readonly level: Level;
    private neighbors: Map<Direction, Location> = new Map<Direction, Location>();

    constructor(level: Level) {
        this.level = level;
    }

    get world() {
        return this.level.world;
    }

    getNeighbor(d: Direction): Location {
        return this.neighbors.get(d) ?? this;
    }

    setNeighbor(d: Direction, l: Location): void {
        this.neighbors.set(d, l);
    }
}

export function createTestLocations(): [Location, Map<Direction, Location>, Level, World] {
    const world = new World();
    const level = new TestLevel(world);
    const center: TestLocation = new TestLocation(level);
    const map = new Map<Direction, Location>();
    allDirections.forEach(d => {
        let location = new TestLocation(level);
        map.set(d, location);
        center.setNeighbor(d, location);
        location.setNeighbor(reverseDirection(d), center);
    });

    return [center, map, level, world];
}
