import PropTypes from 'prop-types';
import Button  from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export const MovieView = ({movies,user, setUser, token}) => {
    const {movieId}= useParams();

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(()=> {
        const isFavorited = user.FavoriteMovies.includes(movieId)
        setIsFavorite(isFavorited)
    });

    const addFavorite =() => {
        fetch(`https://myflixappjm.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(true);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    }
    const removeFavorite=()=> {
        fetch(`https://myflixappjm.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json()
            }
        }).then((data) => {
            setIsFavorite(false);
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
        })
    };
    const movie = movies.find((m)=> m.id===movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie?.ImagePath} alt=""/>
            </div>
            <div>
                <span>Title: </span>
                <span>{movie?.title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie?.Genre?.Name}</span>
            </div>
            <div>
                <span>Desceiption: </span>
                <span>{movie?.Description}</span>
            </div>
            <div>
                <span>Author: </span>
                <span>{movie?.Director?.Name}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie?.Featured}</span>
            </div>
            {isFavorite ? (
                <Button onClick={removeFavorite}>Remove from favorites</Button>
            ) : (
                <Button onClick={addFavorite}>Add to favorites</Button>
            )}
            <Link to={'/'}>
            <Button varient="primary"md={5}>Back</Button>
            </Link>
        </div>
    );
};
