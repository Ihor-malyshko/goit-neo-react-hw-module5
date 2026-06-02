import { Link, useLocation } from 'react-router-dom'
import styles from './MovieList.module.css'

export default function MovieList({ movies }) {
  const location = useLocation()
  if (!movies || movies.length === 0) return null

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path ? (
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
            ) : (
              <div className={styles.noimg}>No image</div>
            )}
            <p>{movie.title || movie.name}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
