CREATE DATABASE carDB;

USE carDB;

CREATE TABLE cars (
    car_id INT AUTO_INCREMENT NOT NULL, 
    car_name VARCHAR(80), 
    MPG FLOAT,
    cylinders INT,
    displacement FLOAT,
    horsepower FLOAT,
    car_weight FLOAT,
    acceleration FLOAT,
    model INT,
    origin VARCHAR(50),
    CONSTRAINT pk_cars PRIMARY KEY (car_id)
);