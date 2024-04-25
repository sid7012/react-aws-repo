import Button from "react-bootstrap/Button";
import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { AccountContext } from "./Account";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";

const ChangePassword = () => {
  const { getSession } = useContext(AccountContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!email || !password || !newPassword) {
      setError("All fields are required.");
      return;
    }

    if (password === newPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    setError("");

   getSession()
  .then(({ user }) => {
    console.log("User:", user);
    user.changePassword(password, newPassword, (err, result) => {
      if (err) {
        console.error("Error changing password:", err);
        setError("Failed to change password. Please try again.");
        // Check if err has a code property before accessing it
        if (err.code === "LimitExceededException") {
          toast.error("Attempt limit exceeded, please try after some time."); 
        }
      } else {
        console.log("Password changed successfully:", result);
        toast("Password changed successfully");
      }
    });
  })
  .catch((error) => {
    console.error("Error getting user session:", error);
    setError("Failed to get user session. Please try again.");
  });

  };


  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Current password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>New password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Change password
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Form>
      <ToastContainer/>
    </div>
  );
};

export default ChangePassword;