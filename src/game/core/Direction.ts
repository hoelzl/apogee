// Copyright (c) 2019 Dr. Matthias Hölzl.

enum Direction {
    North     = "North",
    East      = "East",
    South     = "South",
    West      = "West",
    NorthEast = "NorthEast",
    NorthWest = "NorthWest",
    SouthEast = "SouthEast",
    SouthWest = "SouthWest",
    Up        = "Up",
    Down      = "Down",
}

export const allDirections = new Set<Direction>([Direction.North,
    Direction.East,
    Direction.South,
    Direction.West,
    Direction.NorthEast,
    Direction.NorthWest,
    Direction.SouthEast,
    Direction.SouthWest,
    Direction.Up,
    Direction.Down]);

export function reverseDirection(d: Direction) {
    switch (d) {
        case Direction.North:
            return Direction.South;
        case Direction.East:
            return Direction.West;
        case Direction.South:
            return Direction.North;
        case Direction.West:
            return Direction.East;
        case Direction.NorthEast:
            return Direction.SouthWest;
        case Direction.NorthWest:
            return Direction.SouthEast;
        case Direction.SouthEast:
            return Direction.NorthWest;
        case Direction.SouthWest:
            return Direction.NorthEast;
        case Direction.Up:
            return Direction.Down;
        case Direction.Down:
            return Direction.Up;
    }
}

export const gridDirections = new Set(Array.from(allDirections).filter(d => isGridDirection(d)));
export const diagonalDirections = new Set(
    Array.from(allDirections).filter(d => isDiagonalDirection(d)));
export const horizontalDirections = new Set(
    Array.from(allDirections).filter(d => isHorizontalDirection(d)));

export function isGridDirection(d: Direction): boolean {
    switch (d) {
        case Direction.North:
        case Direction.East:
        case Direction.South:
        case Direction.West:
            return true;
        default:
            return false;
    }
}

export function isDiagonalDirection(d: Direction): boolean {
    switch (d) {
        case Direction.NorthEast:
        case Direction.NorthWest:
        case Direction.SouthEast:
        case Direction.SouthWest:
            return true;
        default:
            return false;
    }
}

export function isHorizontalDirection(d: Direction): boolean {
    switch (d) {
        case Direction.Up:
        case Direction.Down:
            return true;
        default:
            return false;
    }
}

export default Direction;