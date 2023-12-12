import { FC } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <SimpleGrid spacing={5} columns={[1, 2, 3, 4]}>
      {movies.map((movie) => (
        <MovieCard movie={movie} />
      ))}
    </SimpleGrid>
  );
};

export default MovieList;
