import { useState, useEffect, useRef } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../Login-View/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SearchBar } from "../search-Bar/search-Bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("users"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState();
  const searchRef = useRef(null);

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      console.log("/signup");
      return;
    }

    fetch("https://myflixappjm.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("main view", data);
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
        console.log("movie data ==", moviesFromApi);
        setMovies(moviesFromApi);
        setFilteredMovies(moviesFromApi);
      });
  }, [token]);

  const handleSearch = (event) => {
    const value = event.target.value;
    console.log("handleSearch ==", event.target.value);
    setSearchMovie(value);
    const results = movies.filter((data) => {
      return data.title.toLowerCase().includes(value?.toLowerCase());
    });
    console.log("search result ===", results);
    setFilteredMovies(results);
  };

  const handleFilter = (genre) => {
    const results = movies.filter((movie) => {
      return movie.Genre.Name === genre;
    });
    setFilteredMovies(results);
  };

  const filterMovies = (searchInput) => {
    if (searchInput.trim() === "") {
      setFilteredMovies([]);
    } else {
      const filteredMovies = movies.filter((movie) => {
        return movie.title.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredMovies(filteredMovies);
    }
  };

  const searchMovies = () => {
    console.log('searchRef ===', search)
    if (searchRef.current && searchRef.current.value.trim() !== "") {
      filterMovies(searchRef.current.value);
    } else {
      setFilteredMovies([]);
    }
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
        }}
      />

      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          {location.pathname === "/" && (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <SearchBar
                  handleSearch={handleSearch}
                  searchMovies={searchMovies}
                />
              </div>
              <Row>
                {/* {filteredMovies.length &&
                  filteredMovies.map((movie) => (
                    <Col key={movie.id} md={4} className="mb-5">
                      <MovieCard movie={movie} />
                    </Col>
                  ))} */}
                  {filteredMovies && <MovieCard movies={filteredMovies} />}
              </Row>
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col>
                    <SignupView />
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
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
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
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col> this list is empty!</Col>
                ) : (
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
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>this list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col key={movie.id} md={3} className="mb-4">
                        <MovieCard movie={movie} />
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
  );
};
