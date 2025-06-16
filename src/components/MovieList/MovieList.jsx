import MovieCard from "../MovieCard/MovieCard";
import {useState, useEffect, useRef} from "react";
import axios from "axios";

import "./MovieList.css";

//Note to Self: Handle condition when we run out of movies to run

//Note to self: Handle fallback for images with no paths

//Note to self: Work on tablet media queries

//Note to self: Work on genre ids

//Note to self: Add runtime info for modal

export default function MovieList({search}) {


    const key = import.meta.env.VITE_API_KEY;

    const [genreDict, setGenreDict] = useState({});

    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
                const genres = response.data.genres;
                const dict = {};
                for (const genre of genres){
                    dict[genre.id] = genre.name;
                }   
                setGenreDict(dict);
                if (search === ''){
                    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=${page}`);
                    (page === 1) ? setMovies(data.results) : setMovies([...new Set([...movies, ...data.results])]);
                //Search path
                } else {
                    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${key}&page=${page}`);
                    (page === 1) ? setMovies(data.results) : setMovies([...new Set([...movies, ...data.results])]);        
                }
            } catch (err) {
                console.error("Error fetching list: ", err);
            }
        };
        fetchMovies();
    }, [page, search]);


    useEffect(() => {
        setPage(1);
        setMovies([]);
    }, [search]);

    return (
    <>
    <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.poster_path}
            rating={movie.vote_average}
            release={movie.release_date}
            overview={movie.overview}
            genres={movie.genre_ids.map(id => genreDict[id]).join(", ")}
            />
        ))}
    </div> 
    { (search === '') && <button className="loadBtn" onClick={ () => {
        setPage(page + 1);
    }}>Load More</button>}
    </>
    )
}