const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const graphqlHttp = require('express-graphql');


const app = express();
const PORT = process.env.PORT || 5000;

const router = require('./routes')

//Middlewares

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Routes
// app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running at port : ${PORT}`);
})

const graphqlSchema = require('./Schema/schema');
const graphqlResolver = require('./controllers/resolvers');

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));