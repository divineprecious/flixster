import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
    console.log(searchQuery);
  }

  return (
    <div className="App">
      <header className='header'>
          <h1>Flixster</h1>
          <form className='search-bar'>
            <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder='Search' />
            <button>Search</button>
            <button>Clear</button>
          </form>
        </header>
      <MovieList />
    </div>
  )
}

export default App
