import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { getMovies, searchMovies } from './network'
import { getItemFromLocalStorage, lessThanFiveMinutesAgo } from './utils'

/* Import Custom Components */
import Header from './components/Header'
import Footer from './components/Footer'
import Directory from './components/Directory'
import Detail from './components/Detail'
import Alert from './components/Alert'

/* Import Styles */
import './App.css'

/**
 * Main Functional Component, to keep it light all
 * Network calls, State and Effects are handled here.
 */
const App = () => {
  /* Functional Component State */
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [star, setStar] = useState(0)

  /* React useEffect hook to Load Initial Data */
  useEffect(() => {
    const lastUpdate = new Date(localStorage.getItem('updatedAt'))
    /* Load fresh recommendations only if it's first laod or
     * if it's been more than five minutes since the last update
     * or if you're reloading on an empty search */
    if (
      lessThanFiveMinutesAgo(lastUpdate) ||
      !getItemFromLocalStorage('movies').length
    ) {
      /* We call an anonimous function to perform an asynchronous call
       * within the useEffect React hook to call The Movie DB API */
      ;(async () => {
        await loadRecommendations()
        localStorage.setItem('updatedAt', new Date())
      })()
    } else {
      // Load persisted LocalStorage State
      setFilteredMovies(getItemFromLocalStorage('filteredMovies'))
      setMovies(getItemFromLocalStorage('movies'))
      setSearch(localStorage.getItem('search') || '')
      setStar(getItemFromLocalStorage('star'))
      setLoading(false)
    }
  }, [])

  /** React useEffect hook which filters movies any time the star
   * value is set, this is required as star value may be loaded from
   * LocalStorage
   */
  useEffect(() => {
    if (star > 0) {
      // filter by that star range
      // we multiply by 2 to correctly calculate for vote average
      const rating = star * 2
      const filtered = movies.filter(
        ({ vote_average: voteAverage }) =>
          rating - 2 < voteAverage && rating >= voteAverage,
      )
      setFilteredMovies(filtered)
    }
  }, [star, movies])

  /**
   * React useEffect hook to that the Alert message
   * only appears on screen for 5 seconds
   */
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }
  }, [showAlert])

  /**
   * React useEffect hook to to save the state to LocalStorage
   * for improved user experience on page reload
   */
  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies))
    localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies))
    localStorage.setItem('search', search)
    localStorage.setItem('star', star)
  }, [filteredMovies, movies, search, star])

  /**
   * This function loads the first page of the most popular movies
   * returned from The Movie DB API
   */
  const loadRecommendations = async () => {
    setSearch('')
    try {
      const { results } = await getMovies()
      if (results) {
        setMovies(results)
        setFilteredMovies(results)
      } else {
        setShowAlert(true)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setShowAlert(true)
      setLoading(false)
    }
  }

  /**
   * This function dynamically filters the Movie results shown
   * depending on what the user is writting
   *
   * @param {ChangeEvent} event we destructure the event to grab only
   * the information we're interested in
   */
  const handleSearch = async ({ target: { value } }) => {
    // only search when there are valid values
    if (value.trim()) {
      setSearch(value)
      try {
        const { results } = await searchMovies(value)
        setMovies(results)
        setFilteredMovies(results)
      } catch (error) {
        console.error(error)
        setShowAlert(true)
      }
    } else if (value.length === 0) {
      // reset
      loadRecommendations()
    }
  }

  /**
   * This function selects the rating filter and shows the appropriate
   * movies based on the selection
   *
   * @param {number} star the value of star selected
   */
  const handleRatingSelection = ({ target: { id } }) => {
    // we multiply by 1 to parse from string to number
    const value = id * 1

    if (value === star) {
      // we deselect all values
      setStar(0)
      // reset
      setFilteredMovies(movies)
    } else {
      setStar(value)
    }
  }

  return (
    <Router>
      <div className="App">
        <Header
          search={search}
          handleSearch={handleSearch}
          clearSearch={loadRecommendations}
        />
        {loading && (
          <div id="loading">
            <p>Loading...</p>
          </div>
        )}
        <Switch>
          <Route exact path="/">
            <Directory
              loading={loading}
              filteredMovies={filteredMovies}
              handleRatingSelection={handleRatingSelection}
              rating={star}
            />
          </Route>
          <Route path="/:movieId">
            <Detail setShowAlert={setShowAlert} />
          </Route>
        </Switch>
        <Footer />
        <Alert showAlert={showAlert} />
      </div>
    </Router>
  )
}

export default App
