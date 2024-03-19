import { IGeneralError, IBadRequestError } from "../types";

export abstract class GeneralError implements IGeneralError {
    constructor(public message: string, public status: number) {}
}

export class BadRequest extends GeneralError {
    constructor(public errors: Array<IBadRequestError>) {
        super("Invalid data", 400);
    }

    sendResponse() {
        const normalizedErrors = this.errors.map((error) =>
            this.transformZodError(error)
        );

        return {
            message: this.message,
            status: this.status,
            errors: normalizedErrors,
        };
    }

    private transformZodError(error: IBadRequestError) {
        const path = error.path.join(".");
        return { path, message: error.message };
    }
}

export class Unauthorized extends GeneralError {
    constructor(message: string) {
        super(message, 401);
    }
}

export class Forbidden extends GeneralError {
    constructor(message: string) {
        super(message, 403);
    }
}

export class NotFound extends GeneralError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class ServerError extends GeneralError {
    constructor(public message: string, public stack: string | undefined) {
        super(message, 500);
    }
}
