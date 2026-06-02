const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

async function request(path, params) {
  const url = new URL(BASE_URL + path)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v))
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_ACCESS_KEY}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || res.statusText)
  }
  return res.json()
}

export const fetchTrending = () => request('/trending/movie/day')
export const searchMovies = query => request('/search/movie', { query })
export const getMovieDetails = id => request(`/movie/${id}`)
export const getMovieCredits = id => request(`/movie/${id}/credits`)
export const getMovieReviews = id => request(`/movie/${id}/reviews`)
export const getImageUrl = path => (path ? IMAGE_BASE + path : null)

export default { fetchTrending, searchMovies, getMovieDetails, getMovieCredits, getMovieReviews, getImageUrl }
