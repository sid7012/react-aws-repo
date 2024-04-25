// Callback.js

import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    // Handle authentication callback here
    const params = new URLSearchParams(location.search);
    const code = params.get('code'); // Get authorization code from URL

    // Example: Handle the code, you can use it to authenticate with Cognito
    console.log('Authorization code:', code);

    // Redirect to the desired page after handling the callback
    navigate('/'); // Redirect to the homepage
  }, [location.search, navigate]);

  return <div>Loading...</div>; // Display a loading message while handling the callback
};

export default Callback;
