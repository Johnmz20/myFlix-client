import PropTypes from 'prop-types';

export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Desceiption: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.Featured}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};