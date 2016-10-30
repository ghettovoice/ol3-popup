/**
 * @param {*} arg1 Value to check.
 * @param {*} arg2 Value to check.
 * @param {...*} [args] Values to check.
 * @return {*} First argument that is not equal `undefined` or `null`
 */
export function coalesce(arg1, arg2, ...args) {
    return [].slice.call(arguments).find(value => value != null);
}

/**
 * @param {*} value
 * @return {Array}
 */
export function toArray(value) {
    return isArrayLike(value) ? [].slice.call(value) : [];
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
 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L10755
 */
export function isElement(value) {
    return !!value && isObject(value) && value.nodeType === 1;
}

/**
 * @param {*} value
 * @return {boolean}
 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L11055
 */
export function isObject(value) {
    return !!value && typeof value === 'object';
}

/**
 * Checks if `value` is likely a string.
 *
 * @param {*} value
 * @return {boolean}
 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L11457
 */
export function isString(value) {
    return value != null && (
        typeof value === 'string' ||
        isObject(value) && Object.prototype.toString.call(value) === '[object String]'
    );
}

/**
 * Checks if `value` is Array like object.
 *
 * @param value
 * @returns {boolean}
 * @link https://github.com/lodash/lodash/blob/4.13.1/lodash.js#L10638
 */
export function isArrayLike(value) {
    return !!value && typeof value.length === 'number';
}

/**
 * @param {Element} elem
 */
export function emptyElement(elem) {
    while (elem.hasChildNodes()) {
        elem.removeChild(elem.lastChild);
    }
}

/**
 * Empty function
 *
 * @return void
 */
export function noop() { }
