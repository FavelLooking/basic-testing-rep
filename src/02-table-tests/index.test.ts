// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Multiply, expected: 8 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  {
    a: 4,
    b: 2,
    action: Action.Exponentiate,
    expected: 16,
  },
  { a: 4, b: 2, action: 'notAnAction', expected: null },
  {
    a: 'NotANumber',
    b: 3,
    action: Action.Divide,
    expected: null,
  },
];

describe('simpleCalculator', () => {
  test('should make calculations or return null', () => {
    testCases.forEach(({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    });
  });
  // Consider to use Jest table tests API to test all cases above
});
