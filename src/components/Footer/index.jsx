import React from 'react'
import theMovieDBLogo from '../../images/themoviedb.png'

// import Styles
import './footer.css'

const Footer = () => {
  return (
    <footer>
      <p>Created by: Cristina Rojas - Feb 12, 2020</p>
      <div className="movieDB">
        <img src={theMovieDBLogo} alt="The Movie DB Logo" height={40} />
        <small>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </small>
      </div>
    </footer>
  )
}

export default Footer
