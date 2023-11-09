import { RegexEnum } from "../enums/regex.enum.js";

export class RegexUtil {
    static validateRoman = (roman) => {
        return RegexEnum.VALID_ROMAN.test(roman);
    }
}