import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

/* Import Custom Components */
import Rating from '../Rating'

/* Import Styles */
import './directory.css'

/**
 * A Functional Component in charge of creating all UI
 * components to show the Movie Directory
 *
 * @param {Object} props Directory component props, we're
 * passing the movies that we want to display
 */
const Directory = ({
  loading,
  filteredMovies,
  handleRatingSelection,
  rating,
}) => {
  /* Functional Component Router */
  const { push } = useHistory()

  /**
   * This function saves the selected movie and triggers
   * the code to show the Movie Detail Component
   *
   * @param {ClickEvent} event
   */
  const handleMovieSelection = ({ target: { id } }) => {
    push(`/${id}`)
  }

  return (
    <Fragment>
      <section className="directory">
        <div className="directory-header">
          <h2>Popular Movies</h2>
          <Rating
            rating={rating}
            handleRatingSelection={handleRatingSelection}
          />
        </div>
        {!loading && (
          <div className="movies">
            {!filteredMovies.length && <div>No Results</div>}
            {filteredMovies.map(({ id, poster_path: posterPath, title }) => (
              <img
                id={id}
                key={id}
                src={
                  posterPath
                    ? 'https://image.tmdb.org/t/p/w500' + posterPath
                    : `https://via.placeholder.com/500?text=No+Poster+For+${title
                        .split(' ')
                        .join('+')}`
                }
                alt={title}
                title={title}
                onClick={handleMovieSelection}
              />
            ))}
          </div>
        )}
      </section>
    </Fragment>
  )
}

Directory.propTypes = {
  loading: PropTypes.bool.isRequired,
  filteredMovies: PropTypes.arrayOf(PropTypes.shape({})),
  handleRatingSelection: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
}

export default Directory
