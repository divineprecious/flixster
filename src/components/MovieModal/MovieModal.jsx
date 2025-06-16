import './MovieModal.css'

export default function MovieModal({title, release, overview, onClose, genres})
{
    console.log(genres);
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{title}</h2>
                <img></img>
                <p><strong>Release Date:</strong> {release}</p>
                <p><strong>Overview:</strong> {overview}</p>
                <p><strong>Genres:</strong> {genres}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}