import MovieCard from "../MovieCard/MovieCard";
import {useState, useEffect, useRef} from "react";
import axios from "axios";

import "./MovieList.css";

//Note to Self: Handle condition when we run out of movies to run

export default function MovieList({search, sort}) {


    const key = import.meta.env.VITE_API_KEY;

    const [movies, setMovies] = useState([]);

    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchMovies() {
            try {
                if (sort == "popularity") {
                    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&sort_by=popularity.desc`);   
                    setMovies(data.results);
                }
                else if (sort == "release"){
                    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&sort_by=primary_release_date.desc`);   
                    setMovies(data.results);
                }
                else if (sort == "rating"){
                    const {data} = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&page=${page}&sort_by=vote_average.desc&vote_count.gte=500`);   
                    setMovies(data.results);
                }
                else if ((search === '')){
                    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&page=${page}`);
                    (page === 1) ? setMovies(data.results) : setMovies(prevMovies => [...new Set([...prevMovies, ...data.results])]);
                //Search path
                } else {
                    const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${key}&page=${page}&include_adult=false`);
                    setMovies(data.results);
                }
            } catch (err) {
                console.error("Error fetching list: ", err);
            }
        };
        fetchMovies();
    }, [page, search, sort]);


    useEffect(() => {
        setPage(1);
        setMovies([]);
    }, [search, sort]);


    console.log(movies);
    return (
    <>
    <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.poster_path}
            rating={movie.vote_average.toFixed(1)}
            release={movie.release_date}
            backdrop={movie.backdrop_path}
            id={movie.id}
            />
        ))}
    </div> 
    { (search === '') && <button className="loadBtn" onClick={ () => {
        setPage(page + 1);
    }}>Load More</button>}
    </>
    )
}