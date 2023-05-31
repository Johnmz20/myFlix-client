export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
            </div>
            <div>
                <span>Desceiption: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.director.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};