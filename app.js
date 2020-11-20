"use strict"

const express = require('express');
const db = require('./db/dbservice');

const app = express();

app.get('/allcars', async (req, res) => {
    try {
        let data = await db.getCarsByName();
        res.send(data);
    } catch (error) {
        res.sendStatus(500);
    }
});

// Find all cars going by a certain name
app.get('/findacar/:carname', async (req, res) => {
    let name = req.params.carname;
    try {
        let data = await db.find_a_car(name);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Find all cars from a specific country
app.get('/findbycountry/:origin', async (req, res) => {
    let origin = req.params.origin;
    try {
        let data = await db.findByOrigin(origin);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Find proportion of cars from a particular country
app.get('/originproportion/:origin', async (req, res) => {
    let origin = req.params.origin;
    try {
        let total = await db.getTotal();
        let totalFromOrigin = await db.getTotalFromCountry(origin);
        let carProportion = (totalFromOrigin[0].totalFromOrigin / total[0].totalCars)*100;
        res.send(carProportion);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
})

app.listen(3000);
