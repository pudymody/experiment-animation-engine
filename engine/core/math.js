/**
 * @param {number} n
 * @returns {number}
 */
export function Clamp01(n) {
    return Math.max(Math.min(n, 1), 0);
}
/**
 * @param {number} from
 * @param {number} to
 * @param {number} t
 * @returns {number}
 */
export function Lerp(from, to, t) {
    return t * (to - from) + from;
}
