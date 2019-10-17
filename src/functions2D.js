/**
 * Calculates the distance between two 2-dimensional points.
 *
 * @param {[Number, Number]} p1 First position
 * @param {[Number, Number]} p2 Second position
 * @return {Number} Distance between positions
 */
export function distance(p1, p2) {
  return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
}

/**
 * Rotate vector by a given amount of radians.
 * @param {[Number, Number]} v Vector to rotate
 * @param {Number} rad Angle in radians
 * @param {[Number, Number]} target Target for storing the results
 * @return {Number} Rotated vector
 */
export function rotate(v, rad, target) {
  if (!target) target = v;
  const cr = Math.cos(rad);
  const sr = Math.sin(rad);
  target[0] = cr * v[0] - sr * v[1];
  target[1] = sr * v[0] + cr * v[1];
  return target;
}

/**
 * Rotate vector by 90 degrees. (Counter-clockwise)
 * @param {[Number, Number]} v Vector to rotate
 * @param {[Number, Number]} target Target for storing the results
 * @return {Number} Rotated vector
 */
export function rotate90(v, target) {
  if (!target) target = v;
  target[0] = -v[1];
  target[1] = v[0];
  return target;
}

/**
 * Flip/Rotate vector by 180 degrees.
 * @param {[Number, Number]} v Vector to rotate
 * @param {[Number, Number]} target Target for storing the results
 * @return {Number} Rotated vector
 */
export function rotate180(v, target) {
  if (!target) target = v;
  target[0] = -v[0];
  target[1] = -v[1];
  return target;
}

/**
 * Rotate vector by 270 degrees. (Counter-clockwise)
 * @param {[Number, Number]} v Vector to rotate
 * @param {[Number, Number]} target Target for storing the results
 * @return {Number} Rotated vector
 */
export function rotate270(v, target) {
  if (!target) target = v;
  target[0] = v[1];
  target[1] = -v[0];
  return target;
}

/**
 * Find angle (in radians) between vector and [1, 0].
 * @param {[Number, Number]} v Target vector
 * @return {Number} Angle in radians
 */
export function atan2(v) {
  return Math.atan2(v[1], v[0]);
}

/**
 * Calculates the signed angle between two vectors.
 *
 * @param {[Number, Number]} v1 First vector
 * @param {[Number, Number]} v2 Second vector
 * @returns {Number} Signed angle between vectors
 */
export function signedAngle(v1, v2) {
  let phi = Math.atan2(v2.y, v2.x) - Math.atan2(v1.y, v1.x);
  if (phi > Math.PI) {
    phi -= 2 * Math.PI;
  } else if (phi <= -Math.PI) {
    phi += 2 * Math.PI;
  }
  return phi;
}

/**
 * Interpolates between two positions with given value n.
 *
 * @param {[Number, Number]} p1 Position to interpolate from
 * @param {[Number, Number]} p2 Position to interpolate to
 * @param {Number} n Value between 0 - 1 used for interpolation
 * @param {[Number, Number]} target Target for storing the results
 * @returns {[Number, Number]} Interpolated position
 */
export function lerp(p1, p2, n, target) {
  if (!target) target = p1;
  const m = 1.0 - n;
  target[0] = p1.x * m + p2.x * n;
  target[1] = p1.y * m + p2.y * n;
  return target;
}

/**
 * Rotates a vector, v1, towards a second vector, v2, based on a factor, n.
 * An n-value of 0.5, will return a vector with rotation in between
 * v1 and v2.
 *
 * @example lerpRot([1, 0], [-1, 0]) // [0, 1]
 *
 * @param {[Number, Number]} v1 Vector to interpolate from
 * @param {[Number, Number]} v2 Vector to interpolate to
 * @param {Number} n Value between 0 - 1 used for interpolation
 * @param {[Number, Number]} target
 * @returns {[Number, Number]} Interpolated vector
 */
export function lerpRot(v1, v2, n, target) {
  const phi = signedAngle(v1, v2); // Signed angle
  return rotate(v1, n * phi, target);
}

/**
 * Find the psudo cross product between two 2d vectors.
 * @param {[Number, Number]} v1 Left operand
 * @param {[Number, Number]} v2 Right operand
 * @return {Number} Signed area of the parallellogram defined by v1 and v2
 */
export function cross(v1, v2) {
  return (v1[0] * v2[1]) - (v1[1] * v2[0]);
}
