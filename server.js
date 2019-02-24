var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');

// Schema for our GraphQL validation
var schema = buildSchema(`
    type Query {
        message: String
        kitten(id: String!): Kitten,
        kittens(id: String): [Kitten],
    }
    type Kitten {
        id: String,
        name: String
    }
`);

var getKitten = function(args) {
    if (args.id) {
        var kitten = args.id;
        return kittenData.filter(kitten => kitten.id === id);
    } else {
        return kittenData;
    }
}

// Resolves the root of your API
var root = {
    message: () => 'API Server ready!',
    kittens: getKitten
};

var kittenData = [
    {
        id: '1',
        name: 'pedro'
    },
    {
        id: '2',
        name: 'pablo'
    },
    {
        id: '3',
        name: 'vilma'
    },
    {
        id: '4',
        name: 'betty'
    },
    {
        id: '5',
        name: 'slate'
    },
    {
        id: '6',
        name: 'gazu'
    }
]

// Starts up the server and defines the port to reach the endpoint, returning `message` at the root
var app = express();
app.use('/api', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8000, () => console.log('GraphQL server is up and running on localhost:8000/api'));