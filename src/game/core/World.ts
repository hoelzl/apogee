// Copyright (c) 2019 Dr. Matthias Hölzl.

import CharacterObserver from "./CharacterObserver";
import GameCharacter from "./GameCharacter";
import Location from "./Location";

class World {
    private _observers: Set<CharacterObserver> = new Set<CharacterObserver>();
    private _characters: Set<GameCharacter> = new Set<GameCharacter>();

    get characters(): Set<GameCharacter> {
        return this._characters;
    }

    register(observer: CharacterObserver): void {
        this._observers.add(observer);
    }

    unregister(observer: CharacterObserver): void {
        this._observers.delete(observer);
    }

    noteCharacterCreated(character: GameCharacter): void {
        this.addCharacter(character);
        this._observers.forEach(observer => observer.onCharacterCreated(character));
    }

    noteCharacterMoved(character: GameCharacter, location: Location): void {
        this._observers.forEach(observer => observer.onCharacterMoved(character, location));
    }

    noteCharacterDied(character: GameCharacter): void {
        this.removeCharacter(character);
        this._observers.forEach(observer => observer.onCharacterDied(character));
    }

    private addCharacter(character: GameCharacter): void {
        this._characters.add(character);
    };

    private removeCharacter(character: GameCharacter): void {
        this._characters.delete(character);
    }
}

export default World;