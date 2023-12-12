import { Card, Image, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FC, useCallback } from "react";
import { getImageUrl } from "../../../../api/movies";
import "./styles.scss";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/movie/${movie.id}`);
  }, [movie.id]);

  return (
    <Card className="movie-card" onClick={handleCardClick}>
      <Image
        className="movie-cover"
        src={getImageUrl(movie.poster_path)}
        fallback={<Spinner />}
      />
    </Card>
  );
};

export default MovieCard;
