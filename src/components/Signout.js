import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform sign-out logic here (e.g., clear user session)
    // For example, you can clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    
    // Redirect to the homepage or sign-in page after sign-out
    navigate('/callback');
  }, [navigate]);

  return (
    <div>
      <h2>Sign Out</h2>
      <p>You have been signed out successfully.</p>
      
    </div>
  );
};

export default SignOut;
