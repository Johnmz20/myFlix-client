import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';

export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img className="w-100 border" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
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
            <Button varient="primary" onClick={onBackClick}>Back</Button>
        </div>
    );
};
