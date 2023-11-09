import { RomanService } from "./service/roman.service.js";
import { RedisService } from "./service/redis.service.js";
import express from "express";

const app = express();
const redisService = new RedisService();
await redisService.init();
const romanService = new RomanService(redisService);

app.get('/api', async (req, res) => {
    try {
        const roman = req.query['romanNumber'].toUpperCase();
        if (!RomanService.validateRoman(roman)) {
            throw new Error();
        }
        const num = await romanService.romanToInt(roman);
        res.send({ status: 'OK', result: num });
    } catch (error) {
        res.send("Entrée invalide");
    }
});

app.get('/', (req, res) => {
    const form1 = `
        <form action="/roman" method="get">
            <label for="num">Entrez un nombre:</label>
            <input type="number" id="num" name="num" required>
            <button type="submit">Convertir en chiffres romains</button>
        </form>
    `;
    const form2 = `
        <form action="/int" method="get">
            <label for="roman">Entrez un chiffre romain:</label>
            <input type="text" id="roman" name="roman" required>
            <button type="submit">Convertir en entier</button>
        </form>
    `;
    res.send(form1 + form2);
});

app.get('/roman', async (req, res) => {
    try {
        const num = parseInt(req.query.num);
        const roman = await romanService.intToRoman(num);
        res.send(`L'équivalent en chiffres romains de ${num} est ${roman}`);
    } catch (error) {
        console.error(error);
        res.send("Entrée invalide");
    }
});

app.get('/int', async (req, res) => {
    try {
        const roman = req.query.roman.toUpperCase();
        if (!RomanService.validateRoman(roman)) {
            throw new Error();
        }
        const num = await romanService.romanToInt(roman);
        res.send(`L'équivalent entier de ${roman} est ${num}`);
    } catch (error) {
        console.error(error);
        res.send("Entrée invalide");
    }
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
    console.log('Serveur en écoute sur le port ' + port);
});