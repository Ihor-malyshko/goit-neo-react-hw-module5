import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieReviews } from '../../services/tmdb'
import styles from './MovieReviews.module.css'

export default function MovieReviews() {
  const { movieId } = useParams()
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    getMovieReviews(movieId)
      .then(data => setReviews(data.results || []))
      .catch(err => setError(err.message))
  }, [movieId])

  if (error) return <p>Error: {error}</p>
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>

  return (
    <ul className={styles.list}>
      {reviews.map(r => (
        <li key={r.id} className={styles.item}>
          <h4>{r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  )
}
