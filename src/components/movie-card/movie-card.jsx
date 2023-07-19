import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import "./movie-card.scss";

export const MovieCard = ({ movies }) => {
  console.log("MovieCard ===", movies);
  if (!movies) {
    // Render a fallback or return null if appropriate
    return null;
  }
  return movies.map((movie) => (
    <Col key={movie.id} md={4} className="mb-5">
      <Card
        style={{ backgroundColor: "darkgrey" }}
        className="h-100"
        border="secondary"
      >
        <Card.Img variant="top" src={movie.ImagePath} className="h-100" />
        <Card.Body>
          <Card.Title className="color-form">{movie.title}</Card.Title>
          <Card.Text className="color-text">
            {movie.Director.Name}
          </Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Button variant="primary" className="button-color">
              Open
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  ));
};

// MovieCard.propTypes={
//     movie: PropTypes.shape({
//         ImagePath: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }),
//         Description: PropTypes.string.isRequired,
//         Director: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }),
//         Featured: PropTypes.string.isRequired
//     }),
//     onBackClick: PropTypes.func
// };
