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

MovieCard.prototypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};