class ERROR {
    constructor() {
    }

    /**
     * @param error
     * @constructor
     */
    Type(error) {
        throw new TypeError(error);
    }

    /**
     * @param error
     * @constructor
     */
    Error(error) {
        throw new Error(error);
    }
}

module.exports = ERROR;
