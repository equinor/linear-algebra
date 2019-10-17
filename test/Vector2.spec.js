import expect from 'expect';
import { Vector2 } from '../src/Vector2';

function expectVector2ToBeCloseTo(v1, v2, precision = 2) {
  expect(v1[0]).toBeCloseTo(v2[0], precision);
  expect(v1[1]).toBeCloseTo(v2[1], precision);
}

describe('Vector2.js', () => {
  it('Should be possible to instantiate and assign values', () => {
    const v = new Vector2(1, 1);
    expect(v).toEqual([1, 1]);

    v.x = 2;
    expect(v).toEqual([2, 1]);

    v.y = 3;
    expect(v).toEqual([2, 3]);

    v.set(3, 4);
    expect(v).toEqual([3, 4]);

    expect(Vector2.right).toEqual([1, 0]);
    expect(Vector2.zero).toEqual([0, 0]);
    expect(Vector2.one).toEqual([1, 1]);
  });

  it('Should be able to add/subtract two vectors', () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(2, 3);

    expect(Vector2.add(Vector2.right, Vector2.one)).toEqual([2, 1]);
    expect(v1.add(v2)).toEqual([3, 5]);
    expect(v1).toEqual([1, 2]); // Not mutated

    expect(Vector2.sub(Vector2.one, Vector2.up)).toEqual([1, 0]);
    expect(v2.sub(new Vector2(3, 2))).toEqual([-1, 1]);
  });

  it('Should be able to multiply, scale and rescale vectors', () => {
    expect(Vector2.multiply(Vector2.right, 3)).toEqual([3, 0]);
    expect(new Vector2(2, 3).scale(2)).toEqual([4, 6]);
    expect(Vector2.right.rescale(3)).toEqual([3, 0]);
    expect(new Vector2(3, 4).rescale(10)).toEqual([6, 8]);
  });

  it('Should be able to divide vectors', () => {
    expect(
      Vector2.divide(new Vector2(4, 6), 2),
    ).toEqual([2, 3]);
  });

  it('Should be able to get magnitude of vectors', () => {
    expect(Vector2.right.magnitude).toBeCloseTo(1);
    expect(Vector2.one.magnitude).toBeCloseTo(Math.sqrt(2));
  });

  it('Should be able to clamp the magnitude of vectors', () => {
    expect(new Vector2(10, 0).clampMagnitude(5)).toEqual([5, 0]);
    expect(Vector2.one.clampMagnitude(2)).toEqual(Vector2.one); // No clamping
  });

  it('Should be able to rotate vector arbitrarily', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotateDeg(90), Vector2.up);
    expectVector2ToBeCloseTo( // Using trigonometry
      new Vector2(2, 0).rotate(1),
      [2 * Math.cos(1), 2 * Math.sin(1)],
    );
    expectVector2ToBeCloseTo(Vector2.down.rotate(-Math.PI * 0.5), Vector2.left);
  });

  it('Should be able to rotate 90, 180 and 270 degrees', () => {
    expectVector2ToBeCloseTo(Vector2.right.rotate90(), Vector2.up);
    expectVector2ToBeCloseTo(Vector2.left.rotate180(), Vector2.right);
    expectVector2ToBeCloseTo(Vector2.down.rotate270(), Vector2.left);
  });

  it('Should be able to normalize vector', () => {
    expectVector2ToBeCloseTo(
      new Vector2(5, 5).normalized(),
      new Vector2(Math.sqrt(0.5), Math.sqrt(0.5)),
    );

    const v = new Vector2(10, 0);
    v.normalize(); // Mutate
    expectVector2ToBeCloseTo(v, Vector2.right);
  });

  it('Should be able to find distance between two points', () => {
    expect(Vector2.distance(Vector2.zero, new Vector2(3, 4))).toBeCloseTo(5);
  });

  it('Should be able to find atan2 of vector', () => {
    expect(Vector2.atan2Deg(Vector2.up)).toBeCloseTo(90);
    expect(Vector2.atan2(Vector2.left)).toBeCloseTo(Math.PI);
  });

  it('Should be able to calculate angle, with and without sign', () => {
    expect(Vector2.angleDeg(Vector2.left, Vector2.right)).toBeCloseTo(180);
    expect(Vector2.angle(Vector2.one, Vector2.up)).toBeCloseTo(Math.PI / 4);

    expect(
      Vector2.signedAngleDeg(Vector2.right, Vector2.right.rotate90()),
    ).toBeCloseTo(90);
    expect(
      Vector2.signedAngleDeg(Vector2.right, Vector2.right.rotate270()),
    ).toBeCloseTo(-90);
    expect(Vector2.signedAngle(Vector2.right, Vector2.one)).toBeCloseTo(Math.PI / 4);
  });

  it('Should be able to interpolate between two vectors', () => {
    expectVector2ToBeCloseTo(Vector2.lerp(Vector2.up, Vector2.down, 0.5), Vector2.zero);
    expectVector2ToBeCloseTo( // Trigometry
      Vector2.lerp(Vector2.up, Vector2.right, 0.5),
      Vector2.one.rescale(Math.sin(Math.PI / 4)),
    );
  });

  it('Should be able to interpolate rotation between two vectors', () => {
    expectVector2ToBeCloseTo(
      Vector2.lerpRot(Vector2.up, Vector2.right, 0.5),
      Vector2.one.normalized(),
    );
    expectVector2ToBeCloseTo(
      Vector2.lerpRot(Vector2.up, Vector2.down, 0.75),
      new Vector2(-1, -1).normalized(),
    );
  });
});
