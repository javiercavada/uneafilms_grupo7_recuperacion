import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class MejorValoradas extends React.Component {
  Movies() {
    return this.props.data.MejorValoradas.map(movie => {
      return (
        <table className="tablapeliculas" key={movie.id}>
          <tbody>
            <tr>
              <td>
                <img className="poster" alt="poster" src={movie.poster_path} />
              </td>
              <td className="combitextos">
                <h3 className="titulosPeliculas">{movie.title}</h3>
                <p className="textosPeliculas">{movie.overview}</p>
                <h2 className="valoracionPeliculas">
                  {movie.vote_average} / 10
                </h2>
              </td>
            </tr>
          </tbody>
        </table>
      );
    });
  }

  render() {
    if (this.props.data.loading) return <div></div>;
    return this.Movies();
  }
}

const query = gql`
  {
    MejorValoradas {
      id
      poster_path
      title
      overview
      vote_average
    }
  }
`;
export default graphql(query)(MejorValoradas);
