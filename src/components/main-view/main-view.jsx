import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
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
  const [moviesCopy, setMoviesCopy] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
}


useEffect(() => {
  if(searchQuery) {
   let filteredMovies = movies?.filter(item => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setMovies(filteredMovies)
  }
  else {
    setMovies(moviesCopy)
  }

}, [searchQuery])

  useEffect(()=> { 
    if(!token) { console.log('/signup');
     return;}



        fetch("https://myflixappjm.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('main view', data);
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
                setMoviesCopy(moviesFromApi);
            });
    }, [token]);

    return(
      <BrowserRouter>
      <NavigationBar 
        user={user}
        movies={movies}
        setMovies={setMovies}
        onLoggedOut={() => {
            setUser(null);
            setToken(null)
        }}
       
      
        />


      {user && <input type='search'style={{padding:10, marginTop:10, marginBottom:10,width:'25%'}} placeholder="Search movies" onChange={(e) =>setSearchQuery(e.target.value) }/>}
      <Row >
        <Routes>
          <Route
          path="/signup"
          element={
          <>
          {user ? (
            <Navigate to="/"/>
          ):(
            <Col>
              <SignupView/>
            </Col>
          )}
            </>
          }
          />
          <Route 
                    path="/profile"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <Col md={5}>
                               <ProfileView
                              user={user}
                              token={token}
                              setUser={setUser}
                              movies={movies}
                              onLogout={onLogout}
                                />
                            </Col>
                        )}</>
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
                  movies={movies}
                  user={user}
                  setUser={setUser}
                  token={token}
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