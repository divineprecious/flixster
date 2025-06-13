import MovieCard from "../MovieCard/MovieCard";
import {useState, useEffect} from "react";
import axios from "axios";

import "./MovieList.css";

//Note to Self: Handle condition when we run out of movies to run

export default function MovieList() {
    const key = import.meta.env.VITE_API_KEY;
    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=${page}`);
                //Fixing duplicate responses
                setMovies([...new Set([...movies, ...data.results])]);
                console.log(data.results);
            } catch (err) {
                console.error("Error fetching list: ", err);
            }
        };
        fetchMovies();
    }, [page]);

    return (
    <>
    <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard
            key={movie.title}
            title={movie.title}
            image={movie.poster_path}
            rating={movie.vote_average}
            />
        ))}
    </div> 
    <button className="loadBtn" onClick={ () => {
        setPage(page + 1);
    }}>Load More</button>
    </>
    )
}