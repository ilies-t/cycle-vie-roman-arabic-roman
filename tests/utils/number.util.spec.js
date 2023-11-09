import { describe, expect, test } from '@jest/globals';
import { NumberUtil } from "../../utils/number.util.js";

describe('Testing romain > arabic conversion', () => {
    test('I should return 1', () => {
        expect(NumberUtil.romanToInt('I').num).toBe(1);
    });

    test('II should return 2', () => {
        expect(NumberUtil.romanToInt('II').num).toBe(2);
    });

    test('LXX should return 70', () => {
        expect(NumberUtil.romanToInt('LXX').num).toBe(70);
    });

    test('CM should return 900', () => {
        expect(NumberUtil.romanToInt('CM').num).toBe(900);
    });
});
