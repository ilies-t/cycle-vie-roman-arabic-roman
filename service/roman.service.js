export class RomanService {

    redisService;
    romanMap = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };

    constructor(redisService) {
        this.redisService = redisService;
    }

    static validateRoman = (roman) => {
        const regex = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;
        return regex.test(roman);
    }

    intToRoman = async (num) => {

        // check if response already exists in cache
        const cacheValue = await this.redisService.getValue(num);
        if(cacheValue) {
            return cacheValue;
        }

        if (num === 0) return "O";
        const baseRoman = roman;
        let roman = '';
        for (let i in this.romanMap) {
            while (num >= this.romanMap[i]) {
                roman += i;
                num -= this.romanMap[i];
            }
        }
        await this.redisService.saveOne(num, baseRoman);
        return roman;
    }

    romanToInt = async (roman) => {

        // check if response already exists in cache
        const cacheValue = await this.redisService.getValue(roman);
        if(cacheValue) {
            return cacheValue;
        }

        if (roman === "O") return 0;
        const baseRoman = roman;
        let num = 0;
        for (let i in this.romanMap) {
            while (roman.indexOf(i) === 0) {
                num += this.romanMap[i];
                roman = roman.replace(i, '');
            }
        }
        await this.redisService.saveOne(baseRoman, num);
        return num;
    }
}