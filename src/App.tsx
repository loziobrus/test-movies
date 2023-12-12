import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import store from "./store";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/movie/:id",
    element: <MoviePage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
