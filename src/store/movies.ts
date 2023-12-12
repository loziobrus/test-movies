import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MoviesSearchResponse, getMovieById, getMovies } from "../api/movies";

interface MovieState {
  loading: boolean;
  movies: Movie[];
  pages: MoviesSearchResponse;
  movieDetails: MovieDetails | undefined;
}

const initialState: MovieState = {
  loading: false,
  movies: [],
  pages: {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
  movieDetails: undefined,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.movieDetails = undefined;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchMoviesBySearch.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchMoviesBySearch.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movies = payload.results;
      state.pages = payload;
    });
    build.addCase(fetchMoreMovies.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchMoreMovies.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movies = state.movies.concat(payload.results);
      state.pages = payload;
    });
    build.addCase(fetchMovieDetails.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.movieDetails = payload;
    });
  },
});

export const fetchMoviesBySearch = createAsyncThunk<
  MoviesSearchResponse,
  { searchTerm: string; page?: number }
>("movies/fetchBySearch", async ({ page = 1, searchTerm }) => {
  const movies = await getMovies(searchTerm, page);
  return movies;
});

export const fetchMoreMovies = createAsyncThunk<
  MoviesSearchResponse,
  { searchTerm: string; page?: number }
>("movies/fetchMore", async ({ page = 1, searchTerm }) => {
  const movies = await getMovies(searchTerm, page);
  return movies;
});

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id: string) => {
    const movieDetails = await getMovieById(id);
    return movieDetails;
  }
);

export const { clearMovieDetails } = moviesSlice.actions;

export const MoviesReducer = moviesSlice.reducer;
