import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  function handleSearchChange(event) {
    setInputValue(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchQuery(inputValue);
  }

  function handleClear() {
    setInputValue('');
    setSearchQuery('');
  }

  function handleSortChange(event) {
    setSelectedSort(event.target.value);
  }

  return (
    <div className="App">
      <header className='header'>
          <h1>Flixster</h1>
      </header>
      <main>
        <section className="movie-controls">
          <form className='search-bar' onSubmit={handleSearch}>
              <input type="text" value={inputValue} onChange={handleSearchChange} placeholder='Search for movies' />
              <button type="submit">Search</button>
              <button type="button" onClick={handleClear}>Clear</button>
          </form>
          <select className="sort-pick" onChange={handleSortChange}>
              <option value="">Now Playing</option>
              <option value="popularity">Popularity Descending</option>
              <option value="release">Release Date Descending</option>
              <option value="rating">Rating Descending</option>
          </select>
        </section>
        {<MovieList search={searchQuery} sort={selectedSort}/>}
      </main>
      <footer>
        <h3>© 2025 Flixster</h3>
      </footer>
    </div>
  )
}

export default App
