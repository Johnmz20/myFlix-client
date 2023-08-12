import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  // validation of user login
  const handleSubmit = (event) => {
    // prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username,
      Password,
    };

    fetch("https://myflixappjm.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response:", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.users));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("no such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  // login form with submit button
  return (
    // handleSubmit is the callback of onSubmit, tells the login API to validate user and password
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label className="font-style">Username:</Form.Label>
        <Form.Control
          mb={3}
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          className="color-form"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label className="font-style">Password:</Form.Label>
        <Form.Control
          type="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button md={3} type="submit" id="btn-login-nf">
        Submit
      </Button>
    </Form>
  );
};
