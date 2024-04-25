import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { useAccount } from './Account'; // Assuming you have a hook to access the Account context
import { useLocation, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

const EmailVerificationForm = () => {
    const navigate = useNavigate();
    const { verifyEmail } = useAccount(); // Custom hook to access account methods
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const { email } = location.state || {}; // Extract email from location state
    
    const onSubmit = async (data) => {
      try {
        await verifyEmail(email, data.verificationCode);
        // Handle successful verification, e.g., show a success message
        navigate('/login');
      } catch (error) {
        // Handle verification error, e.g., show an error message
        console.error('Verification error:', error);
      }
    };
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="verificationCode">
                <Form.Label>Email Verification Code</Form.Label>
                <Form.Control
                    type="text"
                    name="verificationCode"
                    placeholder="Enter verification code"
                    {...register('verificationCode', { required: true })}
                />
                {errors.verificationCode && <Form.Text className="text-danger">Verification code is required</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit">
                Verify Email
            </Button>
        </Form>
    );
};

export default EmailVerificationForm;
