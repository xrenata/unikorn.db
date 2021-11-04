const {existsSync, writeFileSync, readFileSync, appendFileSync, mkdirSync} = require('fs');
const {set, unset, has, get, add, subtract} = require('lodash');

/**
 * @param file
 * @returns {boolean}
 * @private
 */
function __exist(file) {
    return existsSync(file);
}

/**
 * @param file
 * @param data
 * @private
 */
function __write(file, data) {
    return writeFileSync(file, data);
}

/**
 * @param file
 * @returns {any}
 * @private
 */
function __read(file) {
    return JSON.parse(readFileSync(file, 'utf8'));
}

/**
 * @param file
 * @private
 */
function __create(file) {
    return appendFileSync(file, '{}');
}

/**
 * @param file
 * @param data
 * @private
 */
function __backUp(file, data) {
    if (!__exist('backups')) {
        mkdirSync('backups');
    }

    return appendFileSync('./backups/' + file, data);
}

module.exports = {
    __exist,
    __write,
    __read,
    __create,
    __backUp,
    set,
    unset,
    get,
    has,
    add,
    subtract,
};
