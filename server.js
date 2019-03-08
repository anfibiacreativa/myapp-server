const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { buildSchema } = require('graphql');
// import CATS from './cats';

// Schema for our GraphQL validation
const schema = buildSchema(`
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

const kittenData = [
  {
      id: '1',
      name: 'pedro',
      mission: 'apollo'
  },
  {
      id: '2',
      name: 'pablo',
      mission: 'apollo'
  },
  {
      id: '3',
      name: 'vilma',
      mission: 'apollo'
  },
  {
      id: '4',
      name: 'betty',
      mission: 'sputnik'
  },
  {
      id: '5',
      name: 'slate',
      mission: 'apollo'
  },
  {
      id: '6',
      name: 'gazu',
      mission: 'sputnik'
  },
  {
      id: '7',
      name: 'fabio',
      mission: 'sputnik'
  },
  {
      id: '8',
      name: 'dani',
      mission: 'sputnik'
  },
  {
      id: '9',
      name: 'paco',
      mission: 'sputnik'
  },
  {
      id: '10',
      name: 'gru',
      mission: 'sputnik'
  },
  {
      id: '11',
      name: 'fabio',
      mission: 'tatiana'
  },
  {
      id: '12',
      name: 'claudio',
      mission: 'apollo'
  },
  {
      id: '13',
      name: 'tatiana',
      mission: 'sputnik'
  },
  {
      id: '14',
      name: 'armando',
      mission: 'sputnik'
  },
  {
      id: '15',
      name: 'serafin',
      mission: 'apollo'
  },
  {
      id: '16',
      name: 'marcos',
      mission: 'sputnik'
  },
  {
      id: '17',
      name: 'martina',
      mission: 'sputnik'
  },
  {
      id: '18',
      name: 'alejo',
      mission: 'sputnik'
  }
]
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