import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

  function handleSearchChange(event) {
    setInputValue(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchQuery(inputValue);
    console.log(searchQuery);
  }

  return (
    <div className="App">
      <header className='header'>
          <h1>Flixster</h1>
          <form className='search-bar' onSubmit={handleSearch}>
            <input type="text" value={inputValue} onChange={handleSearchChange} placeholder='Search' />
            <button type="submit">Search</button>
            <button type="button">Clear</button>
          </form>
        </header>
      <MovieList search={searchQuery}/>
    </div>
  )
}

export default App
