/* helper methods */

/**
 * This function grabs the requested item from LocalStorage
 * @param {String} item the item name
 */
export const getItemFromLocalStorage = item =>
  localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : null

/**
 * This function checks if the provided Date is less than 5min ago
 * @param {Date} date the date we want to compare to
 */
export const lessThanFiveMinutesAgo = date => {
  const FIVE_MINUTES = 1000 * 60 * 5
  const fiveMinutesAgo = Date.now() - FIVE_MINUTES

  return date < fiveMinutesAgo
}
