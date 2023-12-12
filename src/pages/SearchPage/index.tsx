import { Input, InputGroup, InputLeftElement, Spinner } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import ReactPaginate from "react-paginate";
import { debounce } from "lodash";
import { fetchMoreMovies, fetchMoviesBySearch } from "../../store/movies";
import { useAppDispatch, useAppSelector } from "../../store";
import MovieList from "./MovieList";
import "./styles.scss";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const movies = useAppSelector((state) => state.movies.movies);
  const totalPages = useAppSelector((state) => state.movies.pages.total_pages);

  const debouncedHandleSearch = useCallback(
    debounce((value: string) => setSearchTerm(value), 750),
    []
  );

  const handlePageChange = (selectedItem: { selected: number }) => {
    dispatch(
      fetchMoviesBySearch({ searchTerm, page: selectedItem.selected + 1 })
    );
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleLoadMore = () => {
    dispatch(fetchMoreMovies({ searchTerm, page: currentPage + 1 }));
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchMoviesBySearch({ searchTerm }));
      setCurrentPage(1);
    }
  }, [searchTerm]);

  return (
    <div className="search-page">
      <InputGroup className="search-bar">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          onChange={(e) => debouncedHandleSearch(e.target.value)}
          placeholder="Search movies"
        />
      </InputGroup>
      {movies.length ? (
        <>
          <MovieList movies={movies} />
          <div>
            <button onClick={handleLoadMore}>Load more</button>
            <ReactPaginate
              activeClassName="active"
              className="pagination"
              breakLabel="..."
              nextLabel=">"
              forcePage={currentPage - 1}
              onPageChange={handlePageChange}
              pageRangeDisplayed={5}
              pageCount={totalPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchPage;
