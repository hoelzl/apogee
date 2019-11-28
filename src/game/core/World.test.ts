// Copyright (c) 2019 Dr. Matthias Hölzl.
/* eslint-disable @typescript-eslint/no-unused-vars */

import {CharacterObserverSpy, createTestLocations} from "./TestSupport/TestDoubles";
import Character from "../character/Character";
import Direction from "./Direction";

describe("World", () => {
    let [location, neighbors, level, unit] = createTestLocations();
    let spy = new CharacterObserverSpy();

    beforeEach(() => {
        [location, neighbors, level, unit] = createTestLocations();
        spy = new CharacterObserverSpy();
        unit.register(spy);
    });

    it("notifies observers when a character is created", () => {
        new Character("Joe", location);
        expect(spy.characterCreatedCount).toBe(1);
    });

    it("keeps track of first created character", () => {
        const character = new Character("Joe", location);
        expect(unit.characters.size).toBe(1);
        expect(unit.characters).toContain(character);
    });

    it("keeps track of multiple created characters", () => {
        const joe = new Character("Joe", location);
        const jill = new Character("Jill", location);
        expect(unit.characters.size).toBe(2);
        expect(unit.characters).toContain(joe);
        expect(unit.characters).toContain(jill);
    });

    it("notifies observers when a character moves", () => {
        const character = new Character("Joe", location);
        character.move(Direction.North);
        character.move(Direction.South);
        expect(spy.characterMovedCount).toBe(2);
    });

    it("notifies observers when a character dies", () => {
        const character = new Character("Joe", location);
        character.die();
        expect(spy.characterDiedCount).toBe(1);
    });

    it("removes dead characters form its characters", () => {
        const joe = new Character("Joe", location);
        const jill = new Character("Jill", location);
        joe.die();
        expect(unit.characters.size).toBe(1);
        expect(unit.characters).not.toContain(joe);
        expect(unit.characters).toContain(jill);
    });

    it("stops notifying observers when they are unregistered", () => {
        unit.unregister(spy);
        new Character("Joe", location);
        expect(spy.characterCreatedCount).toBe(0);
    });
});
