import { useState,useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie view/movie-view";


export const MainView =() => {
    const [movies, setMovies] =useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
useEffect(() => {
    fetch('https://myflixappjm.herokuapp.com/movies')
    .then((response)=> response.json())
    .then((data)=> {
        const moviesFromApi =data.docs.map((movies)=> {
            return{
                _id: movies.id,
                Title: movies.Title,
                ImagePath: movies.ImagePath,
                Description: movies.Description,
                Genre: {
                    Name: movies.Genre.Name
                },
                Director: {
                    Name: movies.Director.Name
                },
                Featured: movies.Featured.toString()
            };
        });
        setMovies(moviesFromApi);
    });
}, []);
    if(selectedMovie) {
        return (
            <MovieView
            movie={selectedMovie}
            onBackClick={()=> setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div> this list is empty!</div>;
    }

    return(
        <div>
            {movies.map((movies)=> (
                <MovieCard
                key={movies.Title}
                movie={movies}
                onMovieClick={(newSelectedMovie)=> {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};