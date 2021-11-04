const {__exist, __read, __write, __create, __backUp, set, unset, get, has, add, subtract} = require('../utils/Helper');
const Error = require('../utils/Error');
const error = new Error();

class DataBase {
    /**
     * @param fileName
     * @param options
     */
    constructor(fileName, options) {
        if (!fileName || fileName && typeof fileName != 'string') throw error.Type('Filename must be string.');
        if (Array.isArray(options)) throw error.Type('Options cannot be an array.');
        if (options === {}) throw error.Type('Options cannot be empty.');

        /**
         * @type {string}
         */
        this.file = fileName + '.json';

        if (!__exist(this.file)) {
            __create(this.file);

            /**
             * @type {*}
             */
            this.data = __read(this.file);
        } else {
            /**
             * @type {*}
             */
            this.data = __read(this.file);
        }

        if (options.backUp && options.backUp.active && options.backUp.timeInterval) {
            if (!__exist('system.config.json')) {
                __create('system.config.json');
            }

            __write('system.config.json', JSON.stringify({timeInterval: options.backUp.timeInterval * 60000}, null, 2));

            const date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDay() + '-' + new Date().getHours() + '-' + new Date().getMinutes() + '-' + new Date().getSeconds();

            setInterval(() => {
                __backUp(this.file.split('.')[0] + '.backUp.' + date + '.json', JSON.stringify(this.data, null, 2));
            }, Number(__read('system.config.json')['timeInterval']));
        }
    }

    /**
     * @param entries
     * @param value
     * @returns {*}
     */
    set(entries, value) {
        if (!entries || !value) throw error.Type('Entries and value cannot be empty.');

        set(this.data, entries, value);

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return this.get(entries);
    }

    /**
     * @param entries
     * @returns {any}
     */
    get(entries) {
        if (!entries) throw error.Type('Entries cannot be empty.');

        return get(this.data, entries);
    }

    /**
     * @param entries
     * @returns {boolean}
     */
    delete(entries) {
        if (!entries) throw error.Type('Entries cannot be empty.');
        if (!get(this.data, entries)) throw error.Type('This entries cannot found.');

        unset(this.data, entries);

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return true;
    }

    /**
     * @param entries
     * @returns {boolean}
     */
    has(entries) {
        if (!entries) throw error.Type('Entries and value cannot be empty.');

        return has(this.data, entries);
    }

    /**
     * @param entries
     * @param value
     * @returns {*}
     */
    add(entries, value) {
        if (!entries || !value) throw error.Type('Entries and value cannot be empty.');
        if (isNaN(value)) throw error.Error('Invalid number.');
        if ((get(this.data, entries)) && typeof (get(this.data, entries)) !== 'number') throw error.Type('You cannot add number with string.');

        const data_ = get(this.data, entries);

        set(this.data, entries, add(data_, value));

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return this.get(entries);
    }

    /**
     * @param entries
     * @param value
     * @returns {*}
     */
    subtract(entries, value) {
        if (!entries || !value) throw error.Type('Entries and value cannot be empty.');
        if (isNaN(value)) throw error.Error('Invalid number.');
        if ((get(this.data, entries)) && typeof (get(this.data, entries)) !== 'number') throw error.Type('You cannot subtract number with string.');

        const data_ = get(this.data, entries);

        set(this.data, entries, subtract(data_, value));

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return this.get(entries);
    }

    /**
     * @param entries
     * @param value
     * @returns {*}
     */
    push(entries, value) {
        if (!entries || !value) throw error.Type('Entries and value cannot be empty.');

        set(this.data, entries, this.get(entries) ? [this.get(entries).toString(), value] : [value]);

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return this.get(entries);
    }

    /**
     * @param entries
     * @param value
     * @returns {*}
     */
    removeArray(entries, value) {
        if (!entries || !value) throw error.Type('Entries and value cannot be empty.');
        if (!get(this.data, entries)) throw error.Type('This array cannot found.');

        const i = this.data[entries].indexOf(value);
        this.data[entries].splice(i, 1);

        const newData = JSON.stringify(this.data, null, 2);

        __write(this.file, newData);

        return this.get(entries);
    }

    /**
     * @returns {*}
     */
    getAll() {
        return this.data;
    }

    /**
     * @returns {boolean}
     */
    deleteAll() {
        __write(this.file, '{}')

        return true;
    }

    /**
     * @param entries
     * @returns {string|"undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"|"array"}
     */
    type(entries) {
        if (!entries) throw error.Type('Entries cannot be empty.');

        const data = get(this.data, entries);

        return Array.isArray(data) ? 'array' : typeof data;
    }
}

module.exports = DataBase;
