import React from "react";
import  PropTypes  from "prop-types";
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = (data) => {
  console.log('moviedata', data)
  if (!data.movie) {
    // Render a fallback or return null if appropriate
    return null;
  }
    return (
        <Card 
      className='h-100'
      border='secondary'
      >
        <Card.Img
          variant='top' 
          src={data?.movie.ImagePath}
          className='border'
        />
        <Card.Body>
          <Card.Title>{data?.movie.title}</Card.Title>
          <Card.Text>{data?.movie.Director.Name}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(data?.movie.id)}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
};

MovieCard.propTypes={
    movie: PropTypes.shape({
        ImagePath: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Featured: PropTypes.string.isRequired
    }),
    onBackClick: PropTypes.func
};