import PropTypes from 'prop-types';

export const MovieView = ({movies, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movies.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movies.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movies.Genre.Name}</span>
            </div>
            <div>
                <span>Desceiption: </span>
                <span>{movies.Description}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movies.Director.Name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movies.Featured}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};

MovieView.propTypes={
    movies: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Featured: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};