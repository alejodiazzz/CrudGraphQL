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

const typeDefs = `#graphql
  type Dish {
    _id: ID!
    idDish: String!
    name: String!
    calories: Int!
    isVegetarian: Boolean!
    value: Int!
    comments: String
  }

  type Query {
    getAll: [Dish]
    getById(idDish: String!): Dish
    getBetweenCalories(min: Int!, max: Int!): [Dish]
  }

  type Mutation {
    createDish(idDish: String!, name: String!, calories: Int!, isVegetarian: Boolean!, value: Int!, comments: String): Dish
    updateDish(idDish: String!, name: String, calories: Int, isVegetarian: Boolean, value: Int, comments: String): Dish
    deleteDish(idDish: String!): Dish
  }
`;
const resolvers = {
  Query: {
    getAll: async () => await Dish.find(),
    getById: async (_, { idDish }) => await Dish.findOne({ idDish }),
    getBetweenCalories: async (_, { min, max }) => await Dish.find({ 
      calories: { $gte: min, $lte: max } 
    }),
  },
  Mutation: {
    createDish: async (_, { idDish, name, calories, isVegetarian, value, comments }) => {
      const newDish = new Dish({ idDish, name, calories, isVegetarian, value, comments });
      await newDish.save();
      return newDish;
    },
    updateDish: async (_, { idDish, ...updates }) => {
      return await Dish.findOneAndUpdate({ idDish }, updates, { new: true });
    },
    deleteDish: async (_, { idDish }) => {
      return await Dish.findOneAndDelete({ idDish });
    },
  },
};

const server = new ApolloServer({
 typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`  Server ready at: ${url}`);
