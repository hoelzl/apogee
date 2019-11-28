// Copyright (c) 2019 Dr. Matthias Hölzl.

import GameCharacter from "./GameCharacter";
import Location from "./Location";

interface CharacterObserver {
    onCharacterCreated(character: GameCharacter): void;

    onCharacterMoved(character: GameCharacter, location: Location): void;

    onCharacterDied(character: GameCharacter): void;
}

export default CharacterObserver;