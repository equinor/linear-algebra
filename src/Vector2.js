import { RAD2DEG, DEG2RAD } from './const';

import {
  add,
  sub,
  scale,
  magnitude,
  normalize,
  dot,
} from './functions';

import {
  distance,
  rotate,
  rotate90,
  rotate180,
  rotate270,
  atan2,
  signedAngle,
  lerp,
  lerpRot,
  cross,
} from './functions2D';

/**
 * Vector2 defines a 2-dimensional vector. It extends the array class,
 * so all functions also support standard Arrays with two
 * elements as inputs.
 */
export class Vector2 extends Array {
  /**
   * @param {Number} val Numeric value
   * @returns {Number} X-component of vector
   */
  get x() { return this[0]; }

  set x(val) { this[0] = val; }

  /**
   * @param {Number} val Numeric value
   * @returns {Number} Y-component of vector
   */
  get y() { return this[1]; }

  set y(val) { this[1] = val; }

  /**
   * Set both components of vector.
   * @param {Number} x X-component of vector
   * @param {Number} y Y-component of vector
   */
  set(x, y) {
    this[0] = x;
    this[1] = y;
  }

  /**
   * Add values of given vector to target vector.
   * @param {Vector2} v Vector to add
   * @returns {Vector2} Resulting vector
   */
  add(v) {
    return add(this, v, new Vector2(2));
  }

  /**
   * v1 + v2
   *
   * Add two values together.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Vector2} Resulting vector
   */
  static add(v1, v2) {
    return add(v1, v2, new Vector2(2));
  }

  /**
   * Subtract values of given vector from target vector.
   * @param {Vector2} v Vector to subtract
   * @returns {Vector2} Resulting vector
   */
  sub(v) {
    return sub(this, v, new Vector2(2));
  }

  /**
   * v1 - v2
   *
   * Subtract second vector from first vector.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Vector2} Resulting vector
   */
  static sub(v1, v2) {
    return sub(v1, v2, new Vector2(2));
  }

  /**
   * v / n
   *
   * Divide vector by a numeric value.
   * @param {Vector2} v Vector to divide
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  static divide(v, n) {
    return scale(v, 1 / n, new Vector2(2));
  }

  /**
   * v * n
   *
   * Multiply vector by a numeric value.
   * @param {Vector2} v Vector to multiply
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  static multiply(v, n) {
    return scale(v, n, new Vector2(2));
  }

  /**
   * Scale vector by a numeric value.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  scale(n) {
    return scale(this, n, new Vector2(2));
  }

  /**
   * Rescale the vector to given length.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  rescale(n) {
    const len = magnitude(this);
    return scale(this, n / len, new Vector2(2));
  }

  /**
   * Ensures that the magnitude of the vector does not
   * exceed a given length.
   * @param {Number} n Numeric value
   * @returns {Vector2} Resulting vector
   */
  clampMagnitude(n) {
    const len = magnitude(this);
    if (len > n) return scale(this, n / len, new Vector2(2));
    return new Vector2(this[0], this[1]);
  }

  /**
   * Rotate the vector by specified amount of radians. Positive
   * rotation is counter-clockwise.
   * @param {Number} rad Radians to rotate
   * @returns {Vector2} Resulting vector
   */
  rotate(rad) {
    return rotate(this, rad, new Vector2(2));
  }

  /**
   * Rotate the vector by specified amount of degrees. Positive
   * rotation is counter-clockwise.
   * @param {Number} rad Degrees to rotate
   * @returns {Vector2} Resulting vector
   */
  rotateDeg(deg) {
    return rotate(this, deg * DEG2RAD, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 90 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate90() {
    return rotate90(this, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 180 degrees. Resulting
   * vector is opposite to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate180() {
    return rotate180(this, new Vector2(2));
  }

  /**
   * Rotate the vector counter-clockwise by an amount of 270 degrees. Resulting
   * vector is perpendicular to the original.
   * @returns {Vector2} Resulting vector
   */
  rotate270() {
    return rotate270(this, new Vector2(2));
  }

  /**
   * [Mutation] Normalizes the vector.
   * @returns {Vector2} Reference to vector
   */
  normalize() {
    return normalize(this); // Mutate vector
  }

  /**
   * Get normalized version of vector.
   * @returns {Vector2} Resulting vector
   */
  normalized() {
    return normalize(this, new Vector2(2)); // Don't mutate
  }

  /**
   * Get distance between two positions.
   * @param {Vector2} p1 First position
   * @param {Vector2} p2 Second position
   * @returns Distance between positions
   */
  static distance(p1, p2) {
    return distance(p1, p2);
  }

  /**
   * Get dot product between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @return {Number} Dot product
   */
  static dot(v1, v2) {
    return dot(v1, v2);
  }

  /**
   * Get cross product between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @return {Number} Cross product
   */
  static cross(v1, v2) {
    return cross(v1, v2);
  }

  /**
   * Get angle (in radians) between vector and [1, 0].
   * @param {Vector2} v Target vector
   * @return {Number} Angle in radians
   */
  static atan2(v) {
    return atan2(v);
  }

  /**
   * Get angle (in degrees) between vector and [1, 0].
   * @param {Vector2} v Target vector
   * @return {Number} Angle in degrees
   */
  static atan2Deg(v) {
    return atan2(v) * RAD2DEG;
  }

  /**
   * Get angle (in radians) between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Number} Angle in radians
   */
  static angle(v1, v2) {
    return Math.abs(signedAngle(v1, v2));
  }

  /**
   * Get angle (in degrees) between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Number} Angle in degrees
   */
  static angleDeg(v1, v2) {
    return Math.abs(signedAngle(v1, v2)) * RAD2DEG;
  }

  /**
   * Get signed angle (in radians) between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Number} Signed angle in radians
   */
  static signedAngle(v1, v2) {
    return signedAngle(v1, v2);
  }

  /**
   * Get signed angle (in degrees) between two vectors.
   * @param {Vector2} v1 First vector
   * @param {Vector2} v2 Second vector
   * @returns {Number} Signed angle in degrees
   */
  static signedAngleDeg(v1, v2) {
    return signedAngle(v1, v2) * RAD2DEG;
  }

  /**
   * Interpolate between two positions with given value n.
   * @param {Vector2} p1 Position to interpolate from
   * @param {Vector2} p2 Position to interpolate to
   * @param {Number} n Value between 0 - 1 used for interpolation
   * @returns {Vector2} Interpolated position
   */
  static lerp(p1, p2, n) {
    return lerp(p1, p2, n, new Vector2(2));
  }

  /**
   * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
   * @param {Vector2} v1 Vector to interpolate from
   * @param {Vector2} v2 Vector to interpolate to
   * @param {Number} n Value between 0 - 1 used for interpolation
   * @returns {Vector2} Interpolated vector
   */
  static lerpRot(v1, v2, n) {
    return lerpRot(v1, v2, n, new Vector2(2));
  }

  /**
   * @param {Number} val Numeric value
   * @returns {Number} Magnitude of the vector
   */
  get magnitude() {
    return magnitude(this);
  }

  set magnitude(val) {
    this.rescale(val);
  }

  /**
   * @returns Vector2 with values: [0, 0]
   */
  static get zero() { return new Vector2(0, 0); }

  /**
   * @returns Vector2 with values: [1, 1]
   */
  static get one() { return new Vector2(1, 1); }

  /**
   * @returns Vector2 with values: [Infinity, Infinity]
   */
  static get positiveInfinity() { return new Vector2(Infinity, Infinity); }

  /**
   * @returns Vector2 with values: [-Infinity, -Infinity]
   */
  static get negativeInfinity() { return new Vector2(-Infinity, -Infinity); }

  /**
   * @returns Vector2 with values: [0, 1]
   */
  static get up() { return new Vector2(0, 1); }

  /**
   * @returns Vector2 with values: [0, -1]
   */
  static get down() { return new Vector2(0, -1); }

  /**
   * @returns Vector2 with values: [1, 0]
   */
  static get right() { return new Vector2(1, 0); }

  /**
   * @returns Vector2 with values: [-1, 0]
   */
  static get left() { return new Vector2(-1, 0); }
}
