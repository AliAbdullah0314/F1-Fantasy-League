import './config.mjs';
import './db.mjs';
import express from 'express'
import path from 'path'
import session from 'express-session';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import axios from 'axios';


import mongoose from 'mongoose';
const User = mongoose.model('User');
const Driver = mongoose.model('Driver');
const Constructor = mongoose.model('Constructor');
const Principal = mongoose.model('Principal');

let driverprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700, 3700, 3700, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3200, 3200, 3200, 3000, 3000];
let constructorprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700];
let principalprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700];
let principalmulti = [1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1];

let fetch = await axios.get('http://ergast.com/api/f1/current/driverStandings.json');
    let arr = fetch.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(arr);
    let drivers = arr.map((ele, i) => {
        return {
            name: `${ele.Driver.givenName} ${ele.Driver.familyName}`,
            points: ele.points,
            price: driverprices[i]
        };
    });

    fetch = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json');
    arr = fetch.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    let constructors = arr.map((ele, i) => {
        return {
            name: ele.Constructor.name,
            points: ele.points,
            price: constructorprices[i]
        };
    });

    let principals = constructors.map((ele, i) => {
        return {
            name: `${ele.name} Principal`,
            multiplier: principalmulti[i],
            price: principalprices[i]
        }
    });

    for (let i = 0; i < drivers.length; i++) {
        const insert = new Driver(drivers[i]);
        await insert.save();
    }

    for (let i = 0; i < constructors.length; i++) {
        const insert = new Constructor(constructors[i]);
        await insert.save();
    }

    for (let i = 0; i < principals.length; i++) {
        const insert = new Principal(principals[i]);
        await insert.save();
    }

    