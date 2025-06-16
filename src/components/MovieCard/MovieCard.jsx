import './MovieCard.css'

import MovieModal from '../MovieModal/MovieModal';

import { useState } from 'react';



export default function MovieCard({title, image, rating, release, overview, genres}) {
    const [showModal, setShowModal] = useState(false)

    function handleClick() {
        setShowModal(true)
    }

    function handleClose() {
        setShowModal(false);
    }

    return (
        <>
        <div className="movie-card" onClick={handleClick}>
            <img src={`https://image.tmdb.org/t/p/w500/${image}`}alt={title}/>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>

        {showModal && (<MovieModal 
        title={title}
        release={release}
        overview={overview}
        onClose={handleClose}
        genres={genres}
        />)}
        </>
    )
}