import './MovieCard.css'

import MovieModal from '../MovieModal/MovieModal';

import { useState } from 'react';

import blankImage from '../../assets/blank.png'



export default function MovieCard({title, image, rating, release, backdrop, id}) {
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
            <img src={image ? `https://image.tmdb.org/t/p/w500/${image}` : blankImage} alt={title}/>
            <h3>{title}</h3>
            <p>{rating}</p>
        </div>

        {showModal && (<MovieModal 
        id={id}
        title={title}
        release={release}
        onClose={handleClose}
        backdrop={backdrop}
        />)}
        </>
    )
}