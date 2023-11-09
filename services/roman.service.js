import {NumberUtil} from "../utils/number.util.js";

export class RomanService {

    redisService;

    constructor(redisService) {
        this.redisService = redisService;
    }

    intToRoman = async (num) => {

        // check if response already exists in cache
        const cacheValue = await this.redisService.getValue(num);
        if(cacheValue) {
            return cacheValue;
        }

        const result = NumberUtil.intToRoman(num);
        if(result.num === "0") {
            return result.num;
        }

        await this.redisService.saveOne(result.baseNum, result.roman);
        return result.roman;
    }

    romanToInt = async (roman) => {

        // check if response already exists in cache
        const cacheValue = await this.redisService.getValue(roman);
        if(cacheValue) {
            return cacheValue;
        }

        const result = NumberUtil.romanToInt(roman);
        if(result.num === 0) {
            return result.num;
        }

        await this.redisService.saveOne(result.baseRoman, result.num);
        return result.num;
    }
}