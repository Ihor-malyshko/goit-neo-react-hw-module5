import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <main className={styles.main}>
      <h2>Page not found</h2>
      <Link to="/">Go to Home</Link>
    </main>
  )
}
