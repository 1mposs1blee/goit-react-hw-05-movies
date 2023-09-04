import { useParams, useLocation, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { useState, useEffect, useRef } from 'react';
import moviesApi from 'services/movies-api';
import { Link, LinkList } from './MovieDetails.styled';
import MovieProfile from 'components/MovieProfile';

const MovieDetails = () => {
  const [movieOptions, setMovieOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const currentLocation = useRef(location);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieOptions = async () => {
      try {
        const movie = await moviesApi.fetchDetailsByMovie(movieId);

        setMovieOptions(movie);
      } catch (error) {
        console.error('Помилка при завантажені деталей фільму:', error);

        alert('Щось пішло не так. Будь ласка, перезавантажте додаток.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieOptions();
  }, [movieId]);

  const fromPath = currentLocation.current.state?.from ?? '/movies';

  return (
    <main>
      {!loading && (
        <>
          <Link to={fromPath}>Go back</Link>
          <MovieProfile movieOptions={movieOptions} />
          <LinkList>
            <li>
              <Link to="cast">Cast of Actors</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </LinkList>
        </>
      )}

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;