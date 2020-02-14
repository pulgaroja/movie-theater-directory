import React from 'react'
import PropTypes from 'prop-types'
import star from '../../images/star.png'
import unstar from '../../images/unstar.png'

/* Import Styles */
import './rating.css'

const Rating = ({ rating, handleRatingSelection }) => {
  /* Functional Component Variables */
  const stars = new Array(5).fill('')

  /**
   * Render helper method which shows if a star is selected
   * or not
   *
   * @param {number} i index number of star button
   */
  const backgroundImage = i => (i < rating ? star : unstar)

  return (
    <div className="ratings">
      Filter by:
      {stars.map((_, i) => (
        <button
          key={i}
          id={i + 1}
          style={{
            backgroundImage: 'url(' + backgroundImage(i) + ')',
          }}
          onClick={handleRatingSelection}
        />
      ))}
    </div>
  )
}

Rating.propTypes = {
  handleRatingSelection: PropTypes.func.isRequired,
}

export default Rating
