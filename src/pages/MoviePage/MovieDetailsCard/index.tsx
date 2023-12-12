import { Card, Image, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { getImageUrl } from "../../../api/movies";
import "./styles.scss";
import InfoTag from "./InfoTag";
import { formatPrice, formatRuntime } from "./helpers";

interface MovieDetailsCardProps {
  movie: MovieDetails;
}

const MovieDetailsCard: FC<MovieDetailsCardProps> = ({ movie }) => {
  return (
    <Card className="movie-details">
      <div className="movie-info">
        <Image src={getImageUrl(movie.poster_path)} />
        <div className="movie-tags">
          <Heading>{movie.title}</Heading>
          <br />
          <InfoTag name="Release date" value={movie.release_date} />
          <InfoTag
            name="Country"
            value={movie.production_countries
              .map(({ iso_3166_1 }) => iso_3166_1)
              .join(", ")}
          />
          <InfoTag name="Runtime" value={formatRuntime(movie.runtime)} />
          <InfoTag
            name="Rating"
            value={(Math.floor(movie.vote_average * 10) / 10).toString()}
          />
          <InfoTag
            name="Genres"
            value={movie.genres.map(({ name }) => name).join(", ")}
          />
          <InfoTag name="Tagline" value={movie.tagline} />
          <InfoTag name="Budget" value={formatPrice(movie.budget)} />
          <InfoTag name="Box office" value={formatPrice(movie.revenue)} />
          <InfoTag name="Status" value={movie.status} />
          <br />
          <Heading size={"md"}>Description</Heading>
          <Text>{movie.overview}</Text>
        </div>
      </div>
    </Card>
  );
};

export default MovieDetailsCard;
