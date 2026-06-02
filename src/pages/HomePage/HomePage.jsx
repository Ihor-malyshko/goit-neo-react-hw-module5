import { useEffect, useState } from 'react'
import { fetchTrending } from '../../services/tmdb'
import MovieList from '../../components/MovieList/MovieList'
import styles from './HomePage.module.css'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    fetchTrending()
      .then(data => setMovies(data.results || []))
      .catch(err => setError(err.message))
  }, [])

  return (
    <main className={styles.main}>
      <h2>Trending today</h2>
      {error && <p>Error: {error}</p>}
      <MovieList movies={movies} />
    </main>
  )
}
