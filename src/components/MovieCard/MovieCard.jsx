import './MovieCard.css'

import MovieModal from '../MovieModal/MovieModal';

import { useState } from 'react';

import blankImage from '../../assets/blank.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye as faEyeRegular, faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faEye as faEyeSolid, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';



export default function MovieCard({title, image, rating, release, backdrop, id}) {
    const [showModal, setShowModal] = useState(false)

    const [watched, setWatched] = useState(false);
    const [liked, setLiked] = useState(false);

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
            <h4>{title}</h4>
            <div className='icons'>
                <FontAwesomeIcon icon={watched ? faEyeSolid: faEyeRegular} 
                onClick={(e) => {
                    e.stopPropagation();
                    setWatched(!watched);
                }}
                />
                <FontAwesomeIcon icon={liked ? faHeartSolid: faHeartRegular} 
                onClick={(e) => {
                    e.stopPropagation();
                    setLiked(!liked);
                }}
                />
            </div>
            <p onClick={(e) => {
                e.stopPropagation();
            }}>	&#11088; {rating}</p>
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