import './MovieModal.css'
import axios from "axios";
import { useState, useEffect} from 'react';

export default function MovieModal({title, release, onClose, backdrop, id})
{   
    const key = import.meta.env.VITE_API_KEY;

    const date = (new Date (release)).toLocaleString("en-us", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    function getGenres(genres = []){
        return genres.map(genre => genre.name).join(", ");
    }

    const [details, setDetails] = useState([])

    useEffect(() => {
        async function getDetails() {
            const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);
            setDetails(data);
        }
        getDetails();
    }, [])

    {console.log(details)};
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{title}</h2>
                <p><strong>Runtime: </strong>{details.runtime} minutes</p>
                <img src={`https://image.tmdb.org/t/p/w500/${backdrop}`} alt={title} />
                <p><strong>Release Date:</strong> {date}</p>
                <p><strong>Overview:</strong> {details.overview}</p>
                <p><strong>Genres:</strong> {getGenres(details.genres)}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
