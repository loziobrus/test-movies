import { configureStore } from "@reduxjs/toolkit";
import { MoviesReducer } from "./movies";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
  reducer: { movies: MoviesReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
