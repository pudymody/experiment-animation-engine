/** @import { Easing } from './easing.ts' */
export {};
/**
 * @typedef {Object} KeyframeProps
 * @property {T} from
 * @property {T} to
 * @property {number} [duration]
 * @property {number} [at]
 * @property {number} [delay]
 * @property {Easing} [ease]
 */
/**
 * @typedef {Object} Keyframe
 * @property {(t: number) => T} value
 * @property {T} to
 * @property {number} endTime
 * @property {number} at
 */
/**
 * @typedef {Object} Timeline
 * @property {(t: number) => void} update
 * @property {T} value
 */
