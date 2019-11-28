// Copyright (c) 2019 Dr. Matthias Hölzl.

import GameCharacter, {GameCharacterConstructor} from "../GameCharacter";
import {CharacterObserverSpy, createTestLocations} from "./TestDoubles";
import Direction, {allDirections} from "../Direction";

export function itSatisfiesGameCharacterSpec(gameCharacterCtor: GameCharacterConstructor): void {
    describe("A GameCharacter instance", () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let [location, neighbors, level, world] = createTestLocations();
        let unit: GameCharacter;

        beforeEach(() => {
            [location, neighbors, level, world] = createTestLocations();
            unit = new gameCharacterCtor("Joe", location);
        });

        it("is alive after construction", () => {
            expect(unit.isAlive).toBeTruthy();
        });

        it("notifies the world that it has been constructed", () => {
            const spy = new CharacterObserverSpy();
            world.register(spy);
            unit = new gameCharacterCtor("Joe", location);
            expect(spy.characterCreatedCount).toBe(1);
        });

        it("stores its construction data", () => {
            expect(unit.name).toEqual("Joe");
            expect(unit.location).toEqual(location);
        });

        it("is in the same world as its location", () => {
            expect(unit.world).toEqual(location.world);
        });

        it.each(Array.from(allDirections))("updates its location after moving", (d: Direction) => {
            const originalLocation = unit.location;
            unit.move(d);
            expect(unit.location).not.toEqual(originalLocation);
            expect(unit.location).toEqual(neighbors.get(d));
        });

        it("notifies the world when moving", () => {
            const spy = new CharacterObserverSpy();
            world.register(spy);
            unit.move(Direction.North);
            expect(spy.characterMovedCount).toBe(1);
        });

        it("is not alive after dying", () => {
            unit.die();
            expect(unit.isAlive).toBeFalsy();
        });

        it("notifies the world when dying", () => {
            const spy = new CharacterObserverSpy();
            world.register(spy);
            unit.die();
            expect(spy.characterDiedCount).toBe(1);
        });
    });
}
