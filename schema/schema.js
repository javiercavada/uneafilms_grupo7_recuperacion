/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
const axios = require('axios');
const {
  GraphQLList,
  GraphQLFloat,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = require('graphql');

const DatosPeliculas = new GraphQLObjectType({
  name: 'Campos',
  fields: {
    id: { type: GraphQLInt },
    poster_path: { type: GraphQLString },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    vote_average: { type: GraphQLFloat }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Estrenos: {
      type: new GraphQLList(DatosPeliculas),
      resolve() {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API}&language=es-ES&page=1`
          )
          .then(res => {
            const movies = res.data.results;
            movies.map(
              movie =>
                (movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
            );
            return movies;
          });
      }
    },
    MejorValoradas: {
      type: new GraphQLList(DatosPeliculas),
      resolve() {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API}&language=es-ES&page=1`
          )
          .then(res => {
            const movies = res.data.results;
            movies.map(
              movie =>
                (movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
            );
            return movies;
          });
      }
    },
    Populares: {
      type: new GraphQLList(DatosPeliculas),
      resolve() {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API}&language=es-ES&page=1`
          )
          .then(res => {
            const movies = res.data.results;
            movies.map(
              movie =>
                (movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
            );
            return movies;
          });
      }
    }
  }
});
export default new GraphQLSchema({
  query: RootQuery
});
