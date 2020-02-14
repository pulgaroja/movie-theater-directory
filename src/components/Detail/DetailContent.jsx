import React from 'react'
import PropTypes from 'prop-types'

const DetailContent = ({ movie }) => {
  return (
    <section className="detail">
      <p className="title">Movie Overview</p>
      <p>{movie.overview}</p>
      {movie.original_language && (
        <p>
          <strong>Movie Original Language:</strong>
          {` ${movie.original_language}`}
        </p>
      )}
      {movie.homepage && (
        <p>
          <strong>Movie Website:</strong>{' '}
          <a href={movie.homepage} target="blank">
            {movie.homepage}
          </a>
        </p>
      )}
      <p className="title">Movie Financial Information</p>
      <p>
        <strong>Budget:</strong>
        <span className="currency">
          {movie.budget > 0
            ? Number(movie.budget).toLocaleString('en', {
                style: 'currency',
                currency: 'USD',
              })
            : 'Unknown'}
        </span>
      </p>
      <p>
        <strong>Movie Revenue:</strong>
        <span className="currency">
          {movie.revenue > 0
            ? Number(movie.revenue).toLocaleString('en', {
                style: 'currency',
                currency: 'USD',
              })
            : 'Unknown'}
        </span>
      </p>
      <p className="title">Production Companies</p>
      <ul>
        {movie.production_companies.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <p className="title">Production Country / Countries</p>
      <ul>
        {movie.production_countries.map(({ name }, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </section>
  )
}

DetailContent.propTypes = {
  movie: PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    budget: PropTypes.number,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    homepage: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    production_countries: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    release_date: PropTypes.string,
    revenue: PropTypes.number,
    runtime: PropTypes.number,
    status: PropTypes.string,
    tagline: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }),
}

export default DetailContent
