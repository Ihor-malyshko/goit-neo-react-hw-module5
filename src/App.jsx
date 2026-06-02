import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'))
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'))

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading page...</div>}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="/movies"
          element={
            <Suspense fallback={<div>Loading page...</div>}>
              <MoviesPage />
            </Suspense>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <Suspense fallback={<div>Loading page...</div>}>
              <MovieDetailsPage />
            </Suspense>
          }
        >
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading section...</div>}>
                <MovieCast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<div>Loading section...</div>}>
                <MovieReviews />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Loading page...</div>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  )
}

export default App
