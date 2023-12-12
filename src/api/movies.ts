import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "03b8572954325680265531140190fd2a";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {};
axios.defaults.params["api_key"] = API_KEY;

export interface MoviesSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = async (
  searchTerm: string,
  page: number
): Promise<MoviesSearchResponse> => {
  const result = await axios({
    method: "get",
    url: "/search/movie",
    params: { query: searchTerm, page },
  });

  return result.data;
};

export const getMovieById = async (id: string): Promise<MovieDetails> => {
  const result = await axios({
    method: "get",
    url: `movie/${id}`,
  });

  return result.data;
};

export const getImageUrl = (poster_path: string) =>
  `https://image.tmdb.org/t/p/original/${poster_path}`;
