import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie view/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflixappjm.herokuapp.com/movies", {
            headers: { Authorization: "Bearer ${token}" },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movies) => {
                    return {
                        _id: movies.id,
                        Title: movies.Title,
                        ImagePath: movies.ImagePath,
                        Description: movies.Description,
                        Genre: {
                            Name: movies.Genre.Name,
                        },
                        Director: {
                            Name: movies.Director.Name,
                        },
                        Featured: movies.Featured.toString(),
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
    }

    if (movies.length === 0) {
        return <div> this list is empty!</div>;
    }

    return (
        <div>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                }}
            >
                logout
            </button>
            {movies.map((movies) => (
                <MovieCard
                    key={movies.Title}
                    movie={movies}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
