import {delay , all, call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import { fetchedSearchMovies, searchMovies } from '../Redux/search';
import {getPopularMovies, fetchedPopularMovies} from '../Redux/movies'
import { API_KEY } from '../Config';
import TheMovieDbApi from '../lib/API';
import { fetchedGenres, getGenres } from '../Redux/genres';
import { getMovie, fetchedMovie } from "../Redux/movie";

const api = new TheMovieDbApi(API_KEY)

function* fetchGenres(){
   yield put(fetchedGenres( yield call(api.getGenres)))
}
function* fetchSearchMovies(action){
  yield console.log(action);
   yield delay(500);

   yield put(
      fetchedSearchMovies(yield call(api.searchMovies, action.payload))
   )
}
function* fetchPopularMovies(action) {
   // yield console.log(action);
   yield put(fetchedPopularMovies(yield call(api.getPopularMovies, action.payload)))
}

function* fetchMovie(action) {
   // console.log(action);
   yield put(fetchedMovie(yield call(api.getMovie, action.payload)))
}
export default function* watcherSaga(){
   yield all([
      yield takeEvery(getMovie.type, fetchMovie),
      yield takeEvery(getPopularMovies.type, fetchPopularMovies),
      yield takeEvery(getGenres.type, fetchGenres),
      yield takeLatest(searchMovies.type, fetchSearchMovies)
   ]) 
}