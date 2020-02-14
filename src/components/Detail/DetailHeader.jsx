import React from 'react'
import PropTypes from 'prop-types'

const DetailHeader = ({ movie }) => {
  const posterImage = movie.poster_path
    ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    : `https://via.placeholder.com/500?text=No+Poster+For+${movie.title
        .split(' ')
        .join('+')}`
  return (
    <section className="detail-header">
      <img src={posterImage} alt={movie.title} />
      <div className="information">
        <p className="date">{movie.release_date}</p>
        <p className="title">{movie.title}</p>
        <p className="tag">{movie.tagline}</p>
        <p className="genres">
          {movie.genres && movie.genres.map(({ name }) => name).join(', ')}
        </p>
        <p>
          <strong>{movie.runtime} mins</strong>
        </p>
        <p>
          <strong>Rating: {movie.vote_average} out of 10</strong> (
          {movie.vote_count} total voters)
        </p>
      </div>
    </section>
  )
}

DetailHeader.propTypes = {
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

export default DetailHeader
