import  PropTypes  from "prop-types";
import { Card } from 'react-bootstrap';

export const MovieCard = ({movie, onMovieClick}) => {
    return (
        <Card 
      className='h-100'
      border='secondary'
      onClick={() => onMovieClick(movie)}
      >
        <Card.Img
          variant='top' 
          src={movie.ImagePath}
          className='border'
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
        </Card.Body>
      </Card>
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