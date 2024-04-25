import { useState, useContext } from "react";
import { AccountContext } from "./Account";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged in! ", data);
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        navigate("/home");
        console.error("Failed to login", err);
        toast.error("Failed to login. Please check your credentials.");
      });
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Form onSubmit={handleSignup}>
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
      <label>Don't have have account?</label>
      <Button onClick={signup}>Signup</Button>
      <ToastContainer />
    </div>
  );
}

export default Login;
