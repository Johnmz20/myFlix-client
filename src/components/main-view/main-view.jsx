import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        if (!token){
            return;
        }

        fetch("https://myflixappjm.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data',data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie.id,
                        title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                        },
                        Director: {
                            Name: movie.Director.Name,
                        },
                        Featured: movie.Featured.toString(),
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

        
        return (
        <>
        <button onClick={()=> {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }}
        >logout</button>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </>
        )
    }

    if (movies.length === 0) {
        return (
        <>
        <button onClick={()=> {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }}
        >logout</button>
        <div> this list is empty!</div>
        </>
        )
    }
    return (
        <div>
          <button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          {movies.map((movie) => (
            <MovieCard
              key={movie.Title}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          ))}
        </div>
      );
};