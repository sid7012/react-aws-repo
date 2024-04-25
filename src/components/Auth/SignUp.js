import React, { useState } from "react";
import UserPool from "./UserPool";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    try {
      await signUp(data.username, data.email, data.password);
      // Pass the email to the Account component
      navigate("/emailverificationform", { state: { email: data.email } });
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  const signUp = (username, email, password) => {
    return new Promise((resolve, reject) => {
      UserPool.signUp(
        email,
        password,
        [
          {
            Name: "email",
            Value: email,
          },
          {
            Name: "name",
            Value: name,
          },
        ],
        null,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSignup({ username: name, email, password });
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <label>Do you already have account?</label>
      <Button onClick={login}>Login</Button>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
