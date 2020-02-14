import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { getMovie } from '../../network'
import headerBackground from '../../images/headerBackground.jpeg'

/* Import Styles */
import './header.css'

/* Default values */
const TITLE = 'Your Local Movie Theater Directory'
const SUBTITLE = "We're just around the corner"

/**
 * A Functional Component which displays the header section,
 * it also provides the user with a Movie Search functionality
 *
 * @param {Object} props Header component props, we're
 * passing the movies that we want to display
 */
const Header = ({ search, handleSearch, clearSearch }) => {
  /* Functional Component Router */
  const {
    location: { pathname },
  } = useHistory()

  /* Functional Component State */
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [backgroundImage, setBackgroundImage] = useState()
  const [loading, setLoading] = useState(false)

  /* Load Initial Data */
  useEffect(() => {
    /** for improved UI any time there's a change in location we temporarily
     * hide the header
     */
    setLoading(true)

    // only load when we have an id to load
    const movieId = pathname.length > 2 ? pathname.replace('/', '') : ''
    if (movieId) {
      /* We call an anonimous function to perform an asynchronous call
       * within the useEffect React hook to call The Movie DB API */
      ;(async () => {
        try {
          const result = await getMovie(movieId)
          if (result.id) {
            setTitle('')
            setSubtitle('')
            setBackgroundImage(
              result.backdrop_path
                ? 'https://image.tmdb.org/t/p/w500' + result.backdrop_path
                : `https://via.placeholder.com/500?text=No+Poster+For+${result.title
                    .split(' ')
                    .join('+')}`,
            )
          }
        } catch (error) {
          console.error(error)
        }
      })()
    } else {
      // reset to defaults
      setTitle(TITLE)
      setSubtitle(SUBTITLE)
      setBackgroundImage(headerBackground)
    }
    setLoading(false)
  }, [pathname])

  return (
    <header style={{ backgroundImage: 'url(' + backgroundImage + ')' }}>
      {!loading && (
        <Fragment>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {!!title.length && (
            <div>
              <input
                type="text"
                placeholder="search"
                value={search}
                onChange={handleSearch}
              />
              <button id="reset-search" onClick={clearSearch}>
                Clear
              </button>
            </div>
          )}
        </Fragment>
      )}
    </header>
  )
}

Header.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
}

export default Header
