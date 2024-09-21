const express = require('express');
const app = express();
const dotenv = require ('dotenv');
dotenv.config();

const mongoConnect = require('./db/connection');

const router = require('./routes/Routes');


app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(router);
// database connection
mongoConnect();



app.listen(process.env.PORT,()=>{
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})