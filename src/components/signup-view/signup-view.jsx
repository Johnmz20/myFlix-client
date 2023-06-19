import { useState } from "react";
import Button  from "react-bootstrap/Button";
import  Form  from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: Birthday,
        };
        fetch("https://myflixappjm.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json",
            },
        }).then((Response) => {
            if (Response.ok) {
                alert("signup successful :D");
                window.location.reload();
            } else {
                alert("signup failed :(");
            }
        });
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="controlUsername">
               <Form.Label>Username: </Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required minLength="4" />
            </Form.Group>
            <Form.Group controlId="controlPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="controlEmail">
               <Form.Label>Email: </Form.Label> 
                <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="ControlBirthday">
                <Form.Label>Birthday: </Form.Label>
                <Form.Control type="date" value={Birthday} onChange={(e) => setBirthday(e.target.value)} required />
            </Form.Group>
            <Button  varient="primary" type="submit">submit</Button>
        </Form>
    );
};
