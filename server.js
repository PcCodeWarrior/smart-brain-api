/**
 * Created by Tom on 3/10/2018.
 */
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host:'',       //add host
        user : '',     //add user
        password : '', //add password
        database : 'smart-brain'
    }
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
    db.select('*').from('users').orderBy('id').then(data => {
        res.send(data);
    });
});


app.post('/register', (req, res) =>register.handleRegister(req, res, db, bcrypt));
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => { image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


app.listen(3000, () => {
    console.log('server is running on port 3000');
});
