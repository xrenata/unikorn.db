String.prototype.replaceAll = (find, replace) => {
    const str = this;

    return str.replace(new RegExp(find, 'g'), replace);
}
