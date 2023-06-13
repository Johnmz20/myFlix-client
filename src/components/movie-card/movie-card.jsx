import  PropTypes  from "prop-types";

export const MovieCard = ({movies, onMovieClick}) => {
    return (
        <div
        onClick={()=> {
            onMovieClick(movies);
        }}
        >
            {movies.Title}
        </div>
    );
};

MovieCard.propTypes={
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