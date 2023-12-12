import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchMovieDetails } from "../../store/movies";
import MovieDetailsCard from "./MovieDetailsCard";
import "./styles.scss";

const MoviePage = () => {
  const dispatch = useAppDispatch();
  const movie = useAppSelector((state) => state.movies.movieDetails);
  const movieId = window.location.href.split("movie/")[1];

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [movieId]);

  return (
    <div className="movie-page">
      {movie && <MovieDetailsCard movie={movie} />}
    </div>
  );
};

export default MoviePage;
