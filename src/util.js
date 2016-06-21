/**
 * @param {*} arg1 Value to check.
 * @param {*} arg2 Value to check.
 * @param {...*} [args] Values to check.
 * @return {*} First argument that is not equal `undefined` or `null`
 */
export function coalesce(arg1, arg2, ...args) {
    return Array.from(arguments).find(value => value != null);
}

/**
 * @param {string} tagName
 * @param {string|string[]} [classes] CSS classes.
 * @param {Object} [attributes] Element attributes.
 * @returns {Element}
 */
export function createElement(tagName, classes, attributes) {
    const elem = document.createElement(tagName);

    if (classes) {
        elem.classList.add.apply(elem.classList, typeof classes === 'string' ? classes.split(' ') : classes);
    }

    if (attributes) {
        Object.keys(attributes).forEach(attribute => elem.setAttribute(attribute, attributes[attribute]));
    }

    return elem;
}

/**
 * Checks if `value` is likely a DOM element.
 *
 * @param {*} value
 * @return {boolean}
 */
export function isElement(value) {
    return !!value && isObject(value) && value.nodeType === 1;
}

/**
 * @param {*} value
 * @return {boolean}
 */
export function isObject(value) {
    return !!value && typeof value === 'object';
}

/**
 * Checks if `value` is likely a string.
 *
 * @param {*} value
 * @return {boolean}
 */
export function isString(value) {
    return typeof value === 'string' || isObject(value) && Object.prototype.toString(value) === '[object String]';
}

/**
 * @param {Element} elem
 */
export function emptyElement(elem) {
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.lastChild);
    }
}
