import React from "react";
import  PropTypes  from "prop-types";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({movie}) => {
    return (
        <Card 
      className='h-100'
      border='secondary'
      >
        <Card.Img
          variant='top' 
          src={movie.ImagePath}
          className='border'
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
            <Button variant="primary">Open</Button>
          </Link>
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