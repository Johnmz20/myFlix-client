import { useState, useEffect } from "react";
import {Button, Col, Form, Row,} from "react-bootstrap";

export const ProfileView = ({ users, token, setUser}) => {
    const [Username, setUsername ] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] =useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit =(event) => {
        event.preventDefault();
        
        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };

        fetch(`https://myflixappjm.herokuapp.com/users/${users.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
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

    return(
        <>
        <h1>Profile</h1>
        <Row>
            <h2>Update your profile: </h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={Username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                    minLength="5"
                />
                </Form.Group>
                <Form.Group controlId="FormPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type="password"
                    value={Password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                    minLength="6"
                />
                </Form.Group>
                <Form.Group controlId="FormEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control
                    type="Email"
                    value={Email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                    type="Birthday"
                    value={Birthday}
                    onChange={(e)=> setBirthday(e.target.value)}
                    required
                />
                </Form.Group>
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </Row>
        </>
    )
}