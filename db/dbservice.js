const data = require('./cars.json');

require('dotenv').config();

const mysql = require('mysql');

const db = mysql.createConnection({
    // user: process.env.USER,
    user: 'root',
    // host: process.env.HOST,
    host: 'localhost',
    // database: process.env.DATABASE,
    database: 'carDB',
    // password: process.env.PASSWORD,
    password: 'veritas'
});

db.connect((error) => {
    if(error) console.error(error);
    console.log('DB '+db.state);
});

// populate the db with data from json file
function addData(car_name, MPG, cylinders, displacement, horsepower, car_weight, acceleration, model, origin) {
    let query = 'INSERT INTO cars (car_id, car_name, MPG, cylinders, displacement, \
                horsepower, car_weight, acceleration, model, origin) \
                VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    db.query(query, [car_name, MPG, cylinders, displacement, horsepower, car_weight, acceleration, model, origin],
                    (err, results) => {
                        if(err) console.error(err);
                        console.log(results.insertId);
                    });
}

// Get data from json file add invoke addData on them
function getData() {
    for(let i = 1; i < data.length; i++) {
        addData(data[i].Car, data[i].MPG, data[i].Cylinders, data[i].Displacement, data[i].Horsepower, 
            data[i].Weight, data[i].Acceleration, data[i].Model, data[i].Origin);
    }
}
/** THE FUNCTION BELOW HAS ALREADY SERVED ITS PURPOSE: POPULATING THE DATABASE */
// getData();

//Get all cars by name
const getCarsByName = function() {
    return new Promise((resolve, reject) => {
        let query = 'SELECT car_id, car_name FROM cars;';
        db.query(query, (err, results) => {
            if(err) reject(err);
            resolve(results);
        });
    });
};

module.exports = { getCarsByName };