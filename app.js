"use strict"

const express = require('express');
const db = require('./db/dbservice');

const app = express();

app.get('/carsbyname', async (req, res) => {
    try {
        let data = await db.getCarsByName();

        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

app.listen(3000);