const express = require('express');
const app = express();

const romanMap = {
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
}

const IntToRoman = (num) => {
    let roman = '';
    for (i in romanMap) {
        while (num >= romanMap[i]) {
            roman += i;
            num -= romanMap[i];
        }
    }
    return roman;
}

const RomanToInt = (roman) => {
    let num = 0;
    for (i in romanMap) {
        while (roman.indexOf(i) === 0) {
            num += romanMap[i];
            roman = roman.replace(i, '');
        }
    }
    return num;
}

app.get('/', (req, res) => {
    const form1 = `
        <form action="/roman" method="get">
            <label for="num">Enter a number:</label>
            <input type="number" id="num" name="num" required>
            <button type="submit">Convert to Roman</button>
        </form>
    `;
    const form2 = `
        <form action="/int" method="get">
            <label for="roman">Enter a Roman numeral:</label>
            <input type="text" id="roman" name="roman" required>
            <button type="submit">Convert to Integer</button>
        </form>
    `;
    res.send(form1 + form2);
});

app.get('/roman', (req, res) => {
    try {
        const num = parseInt(req.query.num);
        const roman = IntToRoman(num);
        res.send(`The Roman numeral equivalent of ${num} is ${roman}`);
    } catch (error) {
        res.send("Invalid input");
    }
});

app.get('/int', (req, res) => {
    try {
        const roman = req.query.roman.toUpperCase();
        const num = RomanToInt(roman);
        res.send(`The integer equivalent of ${roman} is ${num}`);
    } catch (error) {
        res.send("Invalid input");
    }
});

app.get('/roman', (req, res) => {
    try {
        const num = parseInt(req.query.num);
        const roman = IntToRoman(num);
        res.send(`The Roman numeral equivalent of ${num} is ${roman}`);
    } catch (error) {
        res.send("Invalid input");
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});