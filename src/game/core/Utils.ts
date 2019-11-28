// Copyright (c) 2019 Dr. Matthias Hölzl.

export class AssertionError implements Error {
    message: string;
    name: string;

    constructor(message?: string) {
        this.message = message ?? "An assertion failed.";
        this.name = "Assertion Error";
    }
}

export class PreconditionError extends AssertionError {
}

export function assert(condition: any, message?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(message);
    }
}

export function precondition(condition: any, message?: string): asserts condition {
    if (!condition) {
        throw new PreconditionError(message);
    }
}
