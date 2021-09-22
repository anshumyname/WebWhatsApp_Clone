import express from 'express';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import Routes from './routes/Route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config()
const app = express()


app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',Routes);
const PORT = 8000;



const username = process.env.MONG_USERNAME;
const password = process.env.MONG_PASSWORD;



Connection(username, password)
app.listen(PORT,() => console.log('Server is runnign on port '+ PORT ));

