import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {NavigationBar} from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  useEffect(()=> { if(!token) { console.log('/signup'); return;}

        fetch("https://myflixappjm.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('data',data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
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

    return(
      <BrowserRouter>
      <NavigationBar 
        user={user}
        onLoggedOut={() => {
            setUser(null);
            setToken(null)
        }}
        />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
          path="/signup"
          element={
          <>
          {user ? (
            <Navigate to="/"/>
          ):(
            <Col md={5}>
              <SignupView/>
            </Col>
          )}
            </>
          }
          />
          <Route
          path="/login"
          element={
            <>
            {user? (
              <Navigate to="/"/>

            ): (
              <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}/>
              </Col>
            )}
            </>
          }/>
          <Route
          path="/movies/:movieId"
          element={
            <>
            {!user? (
              <Navigate to="/login" replace/>
            ): movies.length ===0 ? (
              <Col> this list is empty!</Col>
            ): (
              <Col md={8}>
                <MovieView 
        movie={movies}
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
        />
              </Col>
            )}
              </>
          }
          />
          <Route 
          path="/"
          element={
            <>
            {!user? (
              <Navigate to="/login" replace/>
            ) : movies.length ===0?(
              <Col>this list is empty!</Col>
            ):(
              <>
              {movies.map(movie => (
              <Col 
                key={movie.id} 
                md={3}
                className='mb-4'>
                <MovieCard 
                  movie={movie}
                  />
                </Col>
              ))}
              </>
            )}
            </>
          }
          />
          
            </Routes>
            </Row>
            </BrowserRouter>
    )
};