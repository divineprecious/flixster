import { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import MovieModal from './components/MovieModal/MovieModal';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('')

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

  return (
    <div className="App">
      <header className='header'>
          <h1>Flixster</h1>
          <form className='search-bar' onSubmit={handleSearch}>
            <input type="text" value={inputValue} onChange={handleSearchChange} placeholder='Search' />
            <button type="submit">Search</button>
            <button type="button" onClick={handleClear}>Clear</button>
          </form>
      </header>
      <main>
        {<MovieList search={searchQuery}/>}
      </main>
    </div>
  )
}

export default App
