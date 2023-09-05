import { useState, useEffect } from 'react';
import moviesApi from 'services/movies-api';
import MoviesList from 'components/MoviesList';
import { PageTitle } from './Home.styled';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const movies = await moviesApi.fetchTrendingMovies();

        setTrendingMovies(movies);
      } catch (error) {
        console.error('Помилка при завантажені трендових фільмів:', error);

        alert('Щось пішло не так. Будь ласка, перезавантажте додаток.');
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <main>
      <PageTitle>Trending Movies</PageTitle>
      {loading ? <div>loading...</div> : <MoviesList movies={trendingMovies} />}
    </main>
  );
};

export default Home;
