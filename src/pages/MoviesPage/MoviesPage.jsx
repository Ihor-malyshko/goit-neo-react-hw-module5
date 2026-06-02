import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../../services/tmdb'
import MovieList from '../../components/MovieList/MovieList'
import styles from './MoviesPage.module.css'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState(null)
  const query = searchParams.get('query') || ''

  useEffect(() => {
    if (!query) return
    setError(null)
    searchMovies(query)
      .then(data => setMovies(data.results || []))
      .catch(err => setError(err.message))
  }, [query])

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const value = form.elements.query.value.trim()
    if (value) setSearchParams({ query: value })
    else setSearchParams({})
  }

  return (
    <main className={styles.main}>
      <h2>Search movies</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input name="query" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
    </main>
  )
}
