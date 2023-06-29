import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';

export const MovieView = ({movie, storedUser, storedToken }) => {
    const {movieId}= useParams();
    const movies = movie.find((m)=> m.id===movieId)
    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>
            <div>
                <span>Desceiption: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie.Director}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.Featured}</span>
            </div>
            <Link to={'/'}>
            <Button varient="primary"md={5}>Back</Button>
            </Link>
        </div>
    );
};
