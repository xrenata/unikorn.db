const {existsSync, readFileSync, appendFile, writeFileSync} = require('fs');

const exists = function (file) {
    return existsSync(file);
}

const read = function (file) {
    return JSON.parse(readFileSync(file, 'utf8'));
}

const append = function (file) {
    return appendFile(file, '{}', (err, data) => {
        if (err) return err;

        return data;
    });
}

const write = function (file, data) {
    return writeFileSync(file, data);
}

module.exports = {
    exists,
    read,
    append,
    write,
};
