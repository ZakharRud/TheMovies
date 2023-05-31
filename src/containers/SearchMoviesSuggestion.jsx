import React from 'react'
import Suggetion from '../components/Suggetion'
import { useSelector } from 'react-redux'


function SearchMoviesSuggestion() {
  const {search} = useSelector((store)=> store)
  const {genres} = useSelector((store)=> store.genres )
  return (
    <Suggetion movies={search} genres={genres}/>
  )
}

export default SearchMoviesSuggestion