import expect from 'expect';
import Vector, { vec2, vec3, vec4 } from '../src/Vector';

describe('Vector class tests', () => {
  it('Can create vectors using constructor and helper functions', () => {
    let v = new Vector(4);
    expect(v.dim).toEqual(4);
    expect(v.value).toEqual([0, 0, 0, 0]);

    v = new Vector([1, 2, 3]);
    expect(v.dim).toEqual(3);
    expect(v.value).toEqual([1, 2, 3]);

    v = new Vector(1, 2, 3);
    v.dim = 4;
    expect(v.dim).toEqual(4);
    expect(v.value).toEqual([1, 2, 3, 0]);

    v = new Vector(4).fill([1, 2, 3, 4]);
    expect(v.value).toEqual([1, 2, 3, 4]);

    v = new Vector(3).fill(1, 2, 3, 4);
    expect(v.value).toEqual([1, 2, 3]);

    v = new Vector(2).fill(vec2(1, 2).swizzle('yx'));
    expect(v.value).toEqual([2, 1]);

    v = new Vector(vec2(1, 2, 3));
    expect(v.dim).toEqual(2);
    expect(v.value).toEqual([1, 2]);

    v = vec2();
    expect(v.dim).toEqual(2);
    expect(v.value).toEqual([0, 0]);

    v = vec2(1);
    expect(v.value).toEqual([1, 1]);

    v = vec2(1, 2);
    expect(v.value).toEqual([1, 2]);

    v = vec3();
    expect(v.dim).toEqual(3);
    expect(v.value).toEqual([0, 0, 0]);

    v = vec3(1);
    expect(v.value).toEqual([1, 1, 1]);

    v = vec3(1, 0);
    expect(v.value).toEqual([1, 0, 0]);

    v = vec3(1, 2);
    expect(v.value).toEqual([1, 2, 0]);

    v = vec4(1, 2, 3, 4);
    expect(v.dim).toEqual(4);
    expect(v.value).toEqual([1, 2, 3, 4]);
    expect(v.x).toBe(1);
    expect(v.y).toBe(2);
    expect(v.z).toBe(3);
    expect(v.w).toBe(4);
    expect(v.x).toBe(v.r);
    expect(v.y).toBe(v.g);
    expect(v.z).toBe(v.b);
    expect(v.w).toBe(v.a);

    const clone = v.clone();

    expect(clone).toEqual(v);
    clone.y = -5;
    expect(clone).not.toEqual(v);
  });

  it('Can get/set vector components using accessors', () => {
    const v = new Vector(4);

    expect(v.value).toEqual([0, 0, 0, 0]);

    v.x = 1;
    v.y = 2;
    v.z = 3;
    v.w = 4;

    expect(v.value).toEqual([1, 2, 3, 4]);

    v.r = 2;
    v.g = 3;
    v.b = 4;
    v.a = 5;

    expect(v.value).toEqual([2, 3, 4, 5]);

    v.dim = 3;

    expect(v.value).toEqual([2, 3, 4]);

    v.fill([1, 2, 3, 4]);
    expect(v.value).toEqual([1, 2, 3]);

    expect(v.x).toEqual(v.r);
    expect(v.y).toEqual(v.g);
    expect(v.z).toEqual(v.b);
    expect(v.w).toEqual(v.a);

  });

  it('Can use swizzle to extract/change vector values', () => {
    const v = new Vector(2, 4, 6, 8);

    expect(v.value).toEqual([2, 4, 6, 8]);
    expect(v.swizzle('xxxx')).toEqual([2, 2, 2, 2]);
    expect(v.swizzle('zwyx')).toEqual([6, 8, 4, 2]);
    expect(v.swizzle('abgrgba')).toEqual([8, 6, 4, 2, 4, 6, 8]);
    expect(v.swizzle('yz')).toEqual([4, 6]);
    expect(v.swizzle('uv')).toEqual([6, 8]);
    expect(v.swizzle('ijkl')).toEqual([2, 4, 6, 8]);
    expect(() => v.swizzle('yzp')).toThrow('Invalid arguments!');
    expect(vec4(1, 2, 3, 4).swap('wyzx').value).toEqual([4, 2, 3, 1]);
  });

  it('Can calculate vector lengths', () => {
    const v = new Vector(2, 1, 2, 0);

    expect(v.length).toEqual(3);
    v.z = 4;
    expect(v.length).toBeCloseTo(4.582575, 5);
    v.z = 2;
    expect(v.length).toEqual(3);
    v.scale(0.5);
    expect(v.length).toEqual(1.5);
  });

  it('Can do vector arithmetic', () => {
    expect(
      vec4(1, 2, 2).add(
        vec4(3, -4, 0, -1),
      ).value).toEqual([4, -2, 2, -1]);

    expect(
      vec2(1, 2, 2).add(
        vec4(3, -4, 0, -1),
      ).value).toEqual([4, -2]);

    expect(
      vec4(1, 2, 2).add(
        vec2(3, -4, 0, -1),
      ).value).toEqual([4, -2, 2, 0]);

    expect(
      vec4(1, 2, 2).sub(
        vec4(3, -4, 0, -1),
      ).value).toEqual([-2, 6, 2, 1]);

    expect(
      vec4(1, 2, 2.3).sub(
        vec4(3, -4, 0.2, -1),
      ).z).toBeCloseTo(2.1, 5);

    expect(
      vec4(1, 2, 2).dot(
        vec4(3, -4, 0, -1),
      )).toEqual(-5);

    expect(
      vec4(0.1, 2, -1.4, 2).dot(
        vec4(2, 0.2, 2, 2.83),
      )).toBeCloseTo(3.46, 5);

    const v1 = vec4(1, 2, 3, 4);
    const v2 = vec4(1, 0, 1, 0);
    const v3 = v1.add(v2);

    expect(v1).not.toBe(v3);

    const v4 = v1.addFrom(v2);

    expect(v1).toBe(v4);
  });
});
