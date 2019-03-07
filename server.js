const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
const CATS = require('./cats');

// Schema for our GraphQL validation
const schema = buildSchema(`
    type Query {
        message: String
        kitten(id: String!): Kitten,
        kittens(id: String): [Kitten],
    }
    type Kitten {
        id: String,
        name: String,
        mission: String
    }
`);

// get the kitten data
const kittenData = CATS;
const getKitten = function(args) {
    if (args.id) {
        const kitten = args.id;
        return kittenData.filter(kitten => kitten.id === id);
    } else {
        return kittenData;
    }
}

// Resolves the root of your API
const root = {
    message: () => 'API Server ready!',
    kittens: getKitten
};

// Define cors options to be able to use cross doamin resource sharing
const whitelist = ['http://localhost:8001', 'http://localhost:8000/api']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('CORS issue!!!'))
    }
  },
  credentials: true
}
// Starts up the server and defines the port to reach the endpoint, returning `message` at the root
const app = express().use(cors(corsOptions)).use(bodyParser.json());
app.use('/api', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000, err => {
    if (err) {
      return console.log(err);
    }
    return console.log('GraphQL server is up and running on localhost:8000/api');
});