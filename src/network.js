const API_URL = 'https://api.themoviedb.org/3/'
const API_KEY = 'a9b856b302ef45f0fc28033e35b71d6a'

export const getMovies = async () => {
  const response = await fetch(`${API_URL}discover/movie?api_key=${API_KEY}`)
  const json = await response.json()
  return { results: json.results }
}

export const getMovie = async id => {
  const response = await fetch(`${API_URL}movie/${id}?api_key=${API_KEY}`)
  const json = await response.json()
  return json
}

export const searchMovies = async query => {
  const response = await fetch(
    `${API_URL}search/movie?api_key=${API_KEY}&query=${query}&include_adult=false`,
  )
  const json = await response.json()
  return { results: json.results }
}
