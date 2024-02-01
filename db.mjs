import mongoose from 'mongoose';

console.log(process.env.DSN);
mongoose.connect(process.env.DSN); //connecting to Database using config management settings

const User = new mongoose.Schema({
    username: String,
    hash: String,// a password hash,
    drivers: Object, 
    team: String,
    principal: String,
    points: Number,
    transfer_penalty: Number
});

const Driver = new mongoose.Schema({
    name: String,
    points: Number,
    price: Number
});

const Constructor = new mongoose.Schema({
    name: String,
    points: Number,
    price: Number
});

const Principal = new mongoose.Schema({
    name: String,
    price: Number,
    multiplier: Number
});

mongoose.model('User', User);
mongoose.model('Driver', Driver);
mongoose.model('Constructor', Constructor);
mongoose.model('Principal', Principal);
