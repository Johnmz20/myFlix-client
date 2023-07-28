import { useState, useEffect } from "react";
import {Button, Col, Form, Row,} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { MovieCard } from "../movie-card/movie-card";
import './profile-view.scss';

export const ProfileView = ({ user, token, setUser, movies, onLogout}) => {
    const [Username, setUsername ] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] =useState("");
    const [Birthday, setBirthday] = useState("");
    const [showModal, setShowModal] = useState(false);

    const favoriteMovies = movies.filter((movies) => {
        return user.FavoriteMovies.includes(movies.id)
    })

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleSubmit =(event) => {
        event.preventDefault();
        
        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };

        fetch(`https://myflixappjm.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { Authorization: `Bearer ${token}` },
        }).then((response)=> {
            if(response.ok) {
                return response.json()
            } else {
                alert("Update failed")
            }
        }).then((data) => {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
         })
    };

    const handleDeleteUser = () => {
        fetch(`https://myflixappjm.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                onLogout();
            } else {
                alert("something went wrong.")
            }
        })
    }
    return(
        <>
        <Col md={8} >
        <h1>Profile</h1>
        <Row className="profile-color">
            <Col >
                <div >Username: {user.Username}</div>
                <div>Email: {user.Email}</div>
            </Col>
        </Row>
        <h2>Update your profile: </h2>
        <Row >
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                <Form.Label className="profile-color">Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                    minLength="5"
                />
                </Form.Group>
                <Form.Group controlId="FormPassword">
                <Form.Label className="profile-color">Password: </Form.Label>
                <Form.Control
                    type="password"
                    value={Password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    minLength="6"
                />
                </Form.Group>
                <Form.Group controlId="FormEmail">
                <Form.Label className="profile-color">Email: </Form.Label>
                <Form.Control
                    type="Email"
                    value={Email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                <Form.Label className="profile-color">Birthday: </Form.Label>
                <Form.Control
                    type="date"
                    value={Birthday}
                    onChange={(e)=> setBirthday(e.target.value)}
                    required
                />
                </Form.Group>
                <Button className="button-colored" variant="primary" type="submit">Update</Button>
            </Form>
            <Form>

            </Form>
        </Row>
        </Col>
        <Row>
            <h2>Favorite movies:</h2>
            {favoriteMovies.map((movie) => (
                <Col  key={movie.id} >
                    <MovieCard movie={movie}></MovieCard>
                </Col>
            ))}
        </Row>
        <Button variant="primary" onClick={handleShowModal}>
            Delete my account
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeleteUser}>Yes</Button>
                <Button variant="secondary" onClick={handleCloseModal}>No</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}