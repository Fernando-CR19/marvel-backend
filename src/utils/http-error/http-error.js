const STATUS_CODE = {
    UNATHORIZED: 402,
    FORBIDDEN: 403,
};

export class HttpError extends Error {

    constructor(options = {}) {
        super(options.message);
        this.name = this.constructor.name;
        this.statusCode = options.statusCode;
        this.message = options.message;
        this.extendedInfo = options.extendedInfo;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class Unathorized extends HttpError {
    constructor(options) {
        super({
            statusCode: STATUS_CODE.UNATHORIZED, message: "Not authorized", ...options,
        });
    }
}

export class Forbidden extends HttpError {
    constructor(options) {
        super({
            statusCode: STATUS_CODE.FORBIDDEN, message: "Not authorized", ...options,
        });
    }
}