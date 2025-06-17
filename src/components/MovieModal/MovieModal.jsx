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

    function getTrailer(link = "") {
        for (const video of videos){
            if (video.type === "Trailer" && video.site === "YouTube"){
                const link = `https://www.youtube.com/embed/${video.key}`;
                return link;
            }
        }
    }

    const [details, setDetails] = useState([]);

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function getDetails() {
            try {
                const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);
                setDetails(data);

                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`);
                setVideos(response.data.results);
            }
            catch (err) {
                console.error("Error fetching list: ", err);
            }
        }
        getDetails();
    }, [])

    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <p><strong>Runtime: </strong>{details.runtime} minutes</p>
                <img src={`https://image.tmdb.org/t/p/w500/${backdrop}`} alt={title} />
                <p><strong>Release Date:</strong> {date}</p>
                <p><strong>Overview:</strong> {details.overview}</p>
                <p><strong>Genres:</strong> {getGenres(details.genres)}</p>
                <iframe
                    src={getTrailer()}
                    allowFullScreen>
                </iframe>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
