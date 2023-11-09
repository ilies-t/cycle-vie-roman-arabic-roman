import {NumberEnum} from "../enums/number.enum.js";

export class NumberUtil {

    static romanToInt = (roman) => {
        if (roman === "O") {
            return { baseRoman: roman, num: 0 };
        }

        const baseRoman = roman;
        let num = 0;
        for (let i in NumberEnum.ROMAN_VALUES) {
            while (roman.indexOf(i) === 0) {
                num += NumberEnum.ROMAN_VALUES[i];
                roman = roman.replace(i, '');
            }
        }
        return { baseRoman, num };
    }

    static intToRoman = (num) => {
        if (num === 0) {
            return { roman: null, baseNum: null, num: "O" };
        }

        const baseNum = num;
        let roman = '';
        for (let i in NumberEnum.ROMAN_VALUES) {
            while (num >= NumberEnum.ROMAN_VALUES[i]) {
                roman += i;
                num -= NumberEnum.ROMAN_VALUES[i];
            }
        }
        return { roman, baseNum, num };
    }
}