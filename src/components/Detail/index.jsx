import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getMovie } from '../../network'
import DetailHeader from './DetailHeader'
import DetailContent from './DetailContent'

/* Import Styles */
import './detail.css'
import { useParams, useHistory } from 'react-router-dom'

/**
 * A Functional Component to display the detail view
 * for the selected Movie. Here I opted on performing
 * one additional API call to grab and utlimately
 * display more Movie information than the one provided
 * by '/discover/movies' endpoint.
 *
 * @param {Object} props
 */
const Detail = ({ setShowAlert }) => {
  /* Functional Component Router */
  const { movieId } = useParams()
  const { goBack } = useHistory()

  /* Functional Component State */
  const [loading, setLoading] = useState(true)
  const [movie, setMovie] = useState()

  /* Load Initial Data */
  useEffect(() => {
    setLoading(true)
    window.scrollTo({ top: 0 })
    // only load when we have an id to load
    if (movieId) {
      /* We call an anonimous function to perform an asynchronous call
       * within the useEffect React hook to call The Movie DB API */
      ;(async () => {
        try {
          const result = await getMovie(movieId)
          if (result.id) {
            setMovie(result)
          } else {
            setShowAlert(true)
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          setShowAlert(true)
          console.error(error)
        }
      })()
    }
  }, [movieId, setShowAlert])

  return (
    <Fragment>
      {!loading && movie && (
        <div className="content">
          <DetailHeader movie={movie} />
          <DetailContent movie={movie} />
          <button onClick={goBack}>Back to Main Menu</button>
        </div>
      )}
      {!movie && (
        <div id="loading">
          {loading && <p>Loading...</p>}
          {!loading && <p>Movie not found</p>}
          <button onClick={goBack}>Back to Main Menu</button>
        </div>
      )}
    </Fragment>
  )
}

Detail.propTypes = {
  setShowAlert: PropTypes.func.isRequired,
}

export default Detail
