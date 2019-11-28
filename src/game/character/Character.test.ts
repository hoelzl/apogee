// Copyright (c) 2019 Dr. Matthias Hölzl.

import {itSatisfiesGameCharacterSpec} from "../core/TestSupport/GameCharacterTest";
import Character from "./Character";

describe("Character", () => {
    itSatisfiesGameCharacterSpec(Character);
});