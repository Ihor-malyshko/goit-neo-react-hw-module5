import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieCredits, getImageUrl } from '../../services/tmdb'
import styles from './MovieCast.module.css'

export default function MovieCast() {
  const { movieId } = useParams()
  const [cast, setCast] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    setError(null)
    getMovieCredits(movieId)
      .then(data => setCast(data.cast || []))
      .catch(err => setError(err.message))
  }, [movieId])

  if (error) return <p>Error: {error}</p>
  if (!cast || cast.length === 0) return <p>No cast information available.</p>

  return (
    <ul className={styles.list}>
      {cast.map(member => (
        <li key={member.cast_id || member.credit_id} className={styles.item}>
          <img src={getImageUrl(member.profile_path)} alt={member.name} />
          <p>{member.name}</p>
          <p className={styles.character}>{member.character}</p>
        </li>
      ))}
    </ul>
  )
}
