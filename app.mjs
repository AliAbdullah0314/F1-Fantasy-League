import './config.mjs';
import './db.mjs';
import express from 'express'
import path from 'path'
import session from 'express-session';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import sanitize from 'mongo-sanitize';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__filename);
// console.log(__dirname);


const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(express.json());


import mongoose from 'mongoose';
const User = mongoose.model('User');
const Driver = mongoose.model('Driver');
const Constructor = mongoose.model('Constructor');
const Principal = mongoose.model('Principal');

app.post('/api/login', async (req, res) => {
    // const dir = path.join(__dirname, 'frontend','src','views','Login.vue')
    // res.render(dir);

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync(req.body.password, salt);
    let fetch = await axios.get('http://ergast.com/api/f1/current/driverStandings.json');
    let arr = fetch.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(arr);
    let drivers = arr.map((ele, i) => {
        return {
            name: `${ele.Driver.givenName} ${ele.Driver.familyName}`,
            points: ele.points,
        };
    });

    fetch = await axios.get('http://ergast.com/api/f1/current/constructorStandings.json');
    arr = fetch.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    let constructors = arr.map((ele, i) => {
        return {
            name: ele.Constructor.name,
            points: ele.points,
        };
    });

    // let principals = constructors.map((ele, i) => {
    //     return {
    //         name: `${ele.name} Principal`,
    //         //multiplier: principalmulti[i]
    //     }
    // });

    for (let i = 0; i < drivers.length; i++) {
        const update = await Driver.findOneAndUpdate({ name: drivers[i].name }, { $set: { "points": drivers[i].points } })

    }

    for (let i = 0; i < constructors.length; i++) {
        const update = await Constructor.findOneAndUpdate({ name: constructors[i].name }, { $set: { "points": constructors[i].points } })

    }

    const users = await User.find();

    for (let i = 0; i < users.length; i++) {
        //calculate new scores
        const driver1 = users[i].drivers.driver1;
        const driver2 = users[i].drivers.driver2;
        const team = users[i].team;
        const principal = users[i].principal;
        const penalty = users[i].transfer_penalty;

        const d1find = await Driver.find({ name: driver1.name });
        const d2find = await Driver.find({ name: driver2.name });
        const cfind = await Constructor.find({ name: team });
        console.log('cfind', users[i]);
        const pfind = await Principal.find({ name: principal });

        let newpoints = ((d1find[0].points + d2find[0].points + cfind[0].points) * pfind[0].multiplier) - penalty;
        //console.log('newpoints ', newpoints);
        newpoints = Math.floor(newpoints);
        const update = await User.findOneAndUpdate({ username: users[i].username }, { "points": newpoints } );
        //console.log('update',update);
    }

    const cleanusername = sanitize(req.body.username);
    const cleanpassword = sanitize(req.body.password);

    const found = await User.find({ username: cleanusername });

    // console.log(hash);
    // console.log(req.body.password)
    if (found.length !== 0) {
        if (bcrypt.compareSync(cleanpassword, found[0].hash)) {
            req.session.username = cleanusername;
            res.send('found');
        }
        else {
            res.send('not found');
        }
    }
    else {
        res.send('not found');
    }

});

app.post('/register/api', async (req, res) => {

    const cleanusername = sanitize(req.body.username);
    const cleanpassword = sanitize(req.body.password);
    const found = await User.find({ username: cleanusername });

    if (found.length !== 0) {
        console.log('taken log')
        res.send("taken");
    }
    else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(cleanpassword, salt);
        const reguser = new User({
            username: cleanusername,
            hash: hash,// a password hash,
            drivers: { driver1: '', driver2: '' }, //
            team: '',
            principal: '',
            points: 0,
            transfer_penalty: 0
        });

        reguser.save().then(() => {
            req.session.username = cleanusername;
            res.send('success');
        }).catch((e) => {
            console.log(e);
            res.send("Internal Server Error");

        });

    }
});

app.get('/league/create/api', async (req, res) => {
    // let driverprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700, 3700, 3700, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3200, 3200, 3200, 3000, 3000];
    // let constructorprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700];
    // let principalprices = [5000, 4500, 4300, 4100, 3900, 3800, 3800, 3800, 3700, 3700];
    // let principalmulti = [1.8, 1.7, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2, 1.1, 1.1];

    const drivers = await Driver.find();
    const constructors = await Constructor.find();
    const principals = await Principal.find();

    const retobj = { drivers, constructors, principals };

    res.json(retobj);
});

app.post('/league/create/api', async (req, res) => {
    const driver1 = await Driver.find({ name: req.body.driver1sel.name })
    const driver2 = await Driver.find({ name: req.body.driver2sel.name })
    const principal = await Principal.find({ name: req.body.principalsel.name })
    const constructor = await Constructor.find({ name: req.body.constructorsel.name })
    let points = ((driver1[0].points + driver2[0].points + constructor[0].points) * principal[0].multiplier);
    points = Math.floor(points);
    const teamset = await User.findOneAndUpdate({ username: req.session.username }, { $set: { drivers: { driver1: req.body.driver1sel, driver2: req.body.driver2sel }, team: req.body.constructorsel.name, principal: req.body.principalsel.name , points: points} })
    res.send();
});

app.get('/myteam/api', async (req, res) => {
    console.log('username: ' + req.session.username)
    const tosend = await User.find({ username: req.session.username });
    console.log('principal 1: ' + tosend[0].team)
    const driver1 = await Driver.find({ name: tosend[0].drivers.driver1.name })
    const driver2 = await Driver.find({ name: tosend[0].drivers.driver2.name })
    const principal = await Principal.find({ name: tosend[0].principal })
    const constructor = await Constructor.find({ name: tosend[0].team })
    let points = ((driver1[0].points + driver2[0].points + constructor[0].points) * principal[0].multiplier) - tosend[0].transfer_penalty;
    points = Math.floor(points);
    const update = await User.findOneAndUpdate({ username: req.session.username }, { "points": points } );


    res.json(
        {
            driver1: driver1[0], 
            driver2: driver2[0], 
            username: tosend[0].username, 
            points: points, 
            principal: principal[0], 
            constructor: constructor[0] 
        });
});

app.get('/league/transfer/api', async (req, res) => {
    const tosend = await User.find({ username: req.session.username });
    const driver1 = await Driver.find({ name: tosend[0].drivers.driver1.name });
    const driver2 = await Driver.find({ name: tosend[0].drivers.driver2.name });
    const drivers = await Driver.find();

    res.json({
        mydrivers: [driver1[0],driver2[0]],
        drivers: drivers,
        username: req.session.username,
        points: tosend[0].points
    });
});

app.post('/league/transfer/api', async (req, res) => {
    const user = await User.find({ username: req.session.username });
    if (req.body.drivergive.name === user[0].drivers.driver1.name) {
        user[0].drivers.driver1 = req.body.driverwant;
        user[0].transfer_penalty = req.body.penalty;
    }
    else if (req.body.drivergive.name === user[0].drivers.driver2.name) {
        user[0].drivers.driver2 = req.body.driverwant;
        user[0].transfer_penalty = req.body.penalty;
    }
    else{
        res.send('error');
    }

    const update = await User.findOneAndUpdate({ username: req.session.username }, { "drivers": user[0].drivers } );
    const update2 = await User.findOneAndUpdate({ username: req.session.username }, { "transfer_penalty": user[0].transfer_penalty } );

    res.send('success');
});

app.get('/league/leaderboard/api', async (req, res) => {
    let users = await User.find().sort({points: 'desc'});
    const curruser = await User.find({ username: req.session.username });
    res.json({users:users, username:req.session.username, points:curruser[0].points});
});

app.get('/league/standings/api', async (req, res) => {
    let fetch = await axios.get('http://ergast.com/api/f1/current/driverStandings.json');
    let arr = fetch.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log(arr);
    let driversarr = arr.map((ele, i) => {
        return {
            position: ele.position,
            name: `${ele.Driver.givenName} ${ele.Driver.familyName}`,
            points: ele.points,
        };
    });

    const curruser = await User.find({ username: req.session.username });

    res.json({driversarr:driversarr, username:req.session.username, points:curruser[0].points });
});

app.get('/authenticate/api', async (req, res) => {
    
    if (req.session.username) {
        const user = await User.find({username: req.session.username});
        res.json({msg: 'authenticated', user: user[0]})
        // res.send('authenticated');
    }
    else {
        res.send('false');
    }
})

//implemented from tutorial
if (process.env.NODE_ENV === 'production') { //env config management

    app.use(express.static(__dirname + '/public/'));

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.listen(process.env.PORT || 3000); //env config management
