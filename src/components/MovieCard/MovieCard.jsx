import './MovieCard.css'

export default function MovieCard({title, image, rating}) {
    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${image}`}alt={title}/>
            <p>{title}</p>
            <p>{rating}</p>
        </div>
    )
}