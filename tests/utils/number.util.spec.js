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

describe('Testing arabic > roman conversion', () => {
    test('1 should return I', () => {
        expect(NumberUtil.intToRoman(1).roman).toBe('I');
    });
    test('2 should return II', () => {
        expect(NumberUtil.intToRoman(2).roman).toBe('II');
    });
    test('70 should return LXX', () => {
        expect(NumberUtil.intToRoman(70).roman).toBe('LXX');
    });
    test('900 should return CM', () => {
        expect(NumberUtil.intToRoman(900).roman).toBe('CM');
    });
});