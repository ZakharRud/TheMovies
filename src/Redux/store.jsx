import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import searchReducer from "./search";
import watcherSaga from "../sagas/Sagas";
import createSagaMiddleware from "@redux-saga/core";
import ganrasReducers from './genres'
import moviesReducer from './movies'
import movieReducer from './movie'

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    search: searchReducer,
    genres: ganrasReducers,
    movies: moviesReducer,
    movie: movieReducer 
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ think: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(watcherSaga);
export default store;
