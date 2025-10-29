import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

import 'dotenv/config';

// Coneccion MongoDB
const MONGO_URI = process.env.MONGO_URI;

// Conecta a la base de datos
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No conectado a MongoDB', err));


import Dish from './models/Dish.js';


const server = new ApolloServer({
 
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`  Server ready at: ${url}`);
