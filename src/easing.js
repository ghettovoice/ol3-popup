/**
 * Easing functions pack
 */
//noinspection JSUnusedGlobalSymbols
/**
 * @param t
 * @return {number}
 */
export function easeInQuad(t) {
    return t * t;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @param t
 * @return {number}
 */
export function easeOutQuad(t) {
    return t * (2 - t);
}

//noinspection JSUnusedGlobalSymbols
/**
 * @param t
 * @return {number}
 */
export function easeInOutQuad(t) {
    return t < .5 ?
           2 * t * t :
           -1 + (4 - 2 * t) * t;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @param t
 * @return {number}
 */
export function easeInCubic(t) {
    return t * t * t;
}

//noinspection JSUnusedGlobalSymbols
/**
 * @param t
 * @return {number}
 */
export function easeOutCubic(t) {
    return (--t) * t * t + 1;
}

/**
 * @param t
 * @return {number}
 */
export function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
