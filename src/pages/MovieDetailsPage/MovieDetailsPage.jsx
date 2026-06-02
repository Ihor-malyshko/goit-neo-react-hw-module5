import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import { getMovieDetails, getImageUrl } from '../../services/tmdb'
import styles from './MovieDetailsPage.module.css'

export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const location = useLocation()
  const backRef = useRef(location.state?.from ?? '/movies')

  useEffect(() => {
    setError(null)
    getMovieDetails(movieId)
      .then(data => setMovie(data))
      .catch(err => setError(err.message))
  }, [movieId])

  if (error) return <p>Error: {error}</p>
  if (!movie) return <p>Loading...</p>

  return (
    <main className={styles.main}>
      <Link to={backRef.current}>Go back</Link>
      <div className={styles.container}>
        {movie.poster_path && <img src={getImageUrl(movie.poster_path)} alt={movie.title} />}
        <div>
          <h2>{movie.title}</h2>
          <p>User score: {Math.round((movie.vote_average || 0) * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h4>Genres</h4>
          <p>{(movie.genres || []).map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <hr />

      <nav className={styles.subnav}>
        <NavLink to={`cast`} className={({ isActive }) => (isActive ? styles.active : '')}>
          Cast
        </NavLink>
        <NavLink to={`reviews`} className={({ isActive }) => (isActive ? styles.active : '')}>
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<div>Loading section...</div>}>
        <Outlet />
      </Suspense>
    </main>
  )
}
