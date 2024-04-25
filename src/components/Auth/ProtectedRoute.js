import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AccountContext } from'./Account';

const ProtectedRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useContext(AccountContext);

  return isLoggedIn ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
